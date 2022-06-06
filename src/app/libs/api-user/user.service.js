import awsUploadService from '../../core/aws/file-upload.service';
import User from '../../core/database/models/user';
import Role from '../../core/database/models/role';
import get from 'lodash/get';
import WorkingExperience from '../../core/database/models/working-experience';
import Certificate from '../../core/database/models/certificate';
import Enrollment from '../../core/database/models/enrollment';
import Course from '../../core/database/models/course';
import Category from '../../core/database/models/category';
import Grade from '../../core/database/models/grade';
import {Op} from 'sequelize';
import isEmpty from 'lodash/isEmpty';

const constructSort = (sortBy) => {
  switch (sortBy) {
    case 'sortby-name-a-z':
      return ['title', 'ASC'];
    case 'sortby-name-z-a':
      return ['title', 'DESC'];
    case 'sortby-price-lowest':
      return ['price', 'ASC'];
    case 'sortby-price-highest':
      return ['price', 'DESC'];
    default:
      return ['updatedAt', 'DESC'];
  }
};

const constructWhere = async (userId, options) => {
  const {type, searchText, categoryFilter, gradeFilter, rangePrice} =
    options || {};
  const whereSearchPhrase = !searchText
    ? {}
    : {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${searchText}%`
            }
          }
        ]
      };

  if (categoryFilter) {
    try {
      const category = await Category.findOne({
        where: {code: categoryFilter.split('-')[1]}
      });

      if (
        category &&
        categoryFilter &&
        categoryFilter.split('-')[1] !== 'all'
      ) {
        if (!whereSearchPhrase[Op.and]) whereSearchPhrase[Op.and] = [];
        whereSearchPhrase[Op.and].push({categoryId: {[Op.eq]: category.id}});
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  if (gradeFilter) {
    try {
      const target =
        gradeFilter.split('-')[1] === 'primary'
          ? [1, 5]
          : gradeFilter.split('-')[1] === 'secondary'
          ? [6, 9]
          : gradeFilter.split('-')[1] === 'high'
          ? [10, 12]
          : [13, 13];

      const grade = await Grade.findOne({
        where: {id: {[Op.between]: target}}
      });

      if (grade && gradeFilter && gradeFilter.split('-')[1] !== 'all') {
        if (!whereSearchPhrase[Op.and]) whereSearchPhrase[Op.and] = [];
        whereSearchPhrase[Op.and].push({gradeId: {[Op.between]: target}});
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  if (rangePrice > -1) {
    if (!whereSearchPhrase[Op.and]) whereSearchPhrase[Op.and] = [];
    whereSearchPhrase[Op.and].push({
      price: {[Op.between]: [0, rangePrice * 1000]}
    });
  }

  if (userId) {
    const enrolledCourses = await Enrollment.findAll({
      where: {
        userId
      }
    });

    const enrolledCourseIds = enrolledCourses.map(function (course) {
      return course.courseId;
    });

    if (!whereSearchPhrase[Op.and]) whereSearchPhrase[Op.and] = [];
    whereSearchPhrase[Op.and].push({
      id: enrolledCourseIds
    });
  }

  let where = whereSearchPhrase;
  switch (type) {
    case 'teacher':
      where = {
        ...where,
        ownerId: userId
      };
  }

  return where;
};

const userService = {
  validateUserHaveAdminPermissions: async (userId) => {
    try {
      const user = await User.findOne({
        where: {
          id: userId
        },
        include: [
          {
            model: Role,
            as: 'role',
            require: true
          }
        ],
        raw: true,
        nest: true
      });

      if (!isEmpty(user)) {
        return (
          get(user, 'role.id', 0) === 2 && get(user, 'role.name') === 'admin'
        );
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  getCurrentUser: async (userId) => {
    try {
      const user = await User.findByPk(userId, {raw: true});
      if (user) {
        const data = {
          userId: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          description: user.description,
          dateOfBirth: user.dateOfBirth,
          avatar: user.avatar,
          isVerifiedToTeach: user.isVerifiedToTeach,
          isVerified: user.isVerified,
          isDisabled: user.isDisabled,
          createdAt: user.createdAt,
          isAdmin: await userService.validateUserHaveAdminPermissions(user.id)
        };

        return data;
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  uploadAvatar: async (userId, avatar) => {
    try {
      const relativePath = `user/${userId}`;
      const result = await awsUploadService.uploadFile(avatar, relativePath);
      const avatarLink = get(result, 'Location');
      const user = await User.findOne({where: {id: userId}});
      await user.update({avatar: avatarLink});

      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  checkUserValidity: async (userId) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return {status: 404, message: 'User not found'};
      }
    } catch (err) {
      console.error(err);
      throw '';
    }
  },

  update: async (userId, data) => {
    try {
      const result = await User.update(data, {
        where: {
          id: userId
        },
        returning: true
      });

      return result[1];
    } catch (err) {
      console.error(err);
      throw 'error.updateUserFail';
    }
  },

  getWorkingExperienceList: async (userId) => {
    try {
      const workingExperience = await WorkingExperience.findAll({
        where: {
          userId
        }
      });

      return workingExperience;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  saveWorkingExperienceList: async (
    workingExperienceListToUpdate,
    workingExperienceListToCreate,
    workingExperienceIdsToDelete
  ) => {
    try {
      workingExperienceListToUpdate.map(async (we) => {
        await WorkingExperience.update(we, {
          where: {
            id: we.id
          }
        });
      });

      await WorkingExperience.bulkCreate(workingExperienceListToCreate);

      await WorkingExperience.destroy({
        where: {
          id: workingExperienceIdsToDelete
        }
      });
    } catch (err) {
      console.error(err);
      throw 'Save working experience fail';
    }
  },

  getCertificates: async (userId) => {
    try {
      const certificates = await Certificate.findAll({
        where: {
          userId
        }
      });

      return certificates;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  saveCertificates: async (
    certificatesToUpdate,
    certificatesToCreate,
    certificateIdsToDelete
  ) => {
    try {
      certificatesToUpdate.map(async (c) => {
        await Certificate.update(c, {
          where: {
            id: c.id
          }
        });
      });

      await Certificate.bulkCreate(certificatesToCreate);

      await Certificate.destroy({
        where: {
          id: certificateIdsToDelete
        }
      });
    } catch (err) {
      console.error(err);
      throw 'Save working experience fail';
    }
  },

  getEnrolledCourses: async (userId, options) => {
    const {
      q: searchPhrase,
      offset,
      limit,
      type,
      searchText = '',
      sortBy = 'sortby-none',
      categoryFilter = 'category-all',
      gradeFilter = 'grade-all',
      rangePrice = -1
    } = options || {};

    const where = await constructWhere(userId, {
      searchPhrase,
      type,
      searchText,
      sortBy,
      categoryFilter,
      gradeFilter,
      rangePrice
    });

    try {
      return await Course.findAll({
        offset: offset || 0,
        limit: limit || 20,
        where,
        order: [constructSort(sortBy)],
        include: [
          {
            model: User,
            as: 'owner',
            attributes: ['firstName', 'lastName', 'avatar']
          },
          {
            model: Category,
            as: 'category',
            attributes: ['id', 'code', 'name', 'description']
          }
        ]
      });
    } catch (err) {
      console.error(err);
      throw 'error.getCourseFail';
    }
  },

  getEnrolledCoursesCount: async (userId, options) => {
    const {
      q: searchPhrase,
      type,
      searchText = '',
      sortBy = 'sortby-none',
      categoryFilter = 'category-all',
      gradeFilter = 'grade-all',
      rangePrice = -1
    } = options || {};

    const where = await constructWhere(userId, {
      searchPhrase,
      type,
      searchText,
      sortBy,
      categoryFilter,
      gradeFilter,
      rangePrice
    });

    try {
      return await Course.count({where});
    } catch (err) {
      console.error(err);
      throw '';
    }
  },

  getStudents: async () => {
    try {
      return await User.findAll({
        where: {
          isVerifiedToTeach: false,
          roleId: 1
        }
      });
    } catch (err) {
      console.error(err);
      throw '';
    }
  }
};

export default userService;
