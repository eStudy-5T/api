import {Op} from 'sequelize';
import Course from '../../core/database/models/course';
import Class from '../../core/database/models/class';

const constructWhere = (userId, options) => {
  const {searchPhrase, type} = options || {};
  const whereSearchPhrase = !searchPhrase
    ? {}
    : {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${searchPhrase}%`
            }
          },
          {
            description: {
              [Op.iLike]: `%${searchPhrase}%`
            }
          }
        ]
      };

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

const courseService = {
  getCourses: async (userId, options) => {
    const {q: searchPhrase, offset, limit, type} = options || {};
    const where = constructWhere(userId, {searchPhrase, type});

    try {
      return await Course.findAll({
        offset: offset || 0,
        limit: limit || 20,
        where,
        sort: [['updatedAt', 'DESC']]
      });
    } catch (err) {
      console.error(err);
      throw 'Getting courses fail';
    }
  },

  getCourseCount: async (userId, options) => {
    const {q: searchPhrase, type} = options || {};
    const where = constructWhere(userId, {searchPhrase, type});

    try {
      return await Course.count({where});
    } catch (err) {
      console.error(err);
      throw 'Getting course count fail';
    }
  },

  getCourseById: async (courseId) => {
    try {
      return await Course.findByPk(courseId);
    } catch (err) {
      console.error(err);
      throw 'Getting course fail';
    }
  },

  createCourse: async (courseData, classes) => {
    try {
      const createdCourse = await Course.create(courseData);

      if (classes?.length) {
        await Class.bulkCreate(
          classes.map((c) => ({...c, courseId: createdCourse.id}))
        );
      }

      return createdCourse;
    } catch (err) {
      console.error(err);
      throw 'Creating course fail';
    }
  },

  checkCourseValidity: async (ownerId, courseId) => {
    try {
      const course = await Course.findByPk(courseId);

      if (!course) {
        return {code: 404};
      }

      if (course.ownerId !== ownerId) {
        return {code: 403};
      }

      return null;
    } catch (err) {
      console.error(err);
      throw 'Check course validity fail';
    }
  },

  updateCourse: async (courseId, courseData) => {
    try {
      const result = await Course.update(courseData, {
        where: {
          id: courseId
        },
        returning: true
      });

      return result[1];
    } catch (err) {
      console.error(err);
      throw 'Updating course fail';
    }
  },

  deleteCourse: async (courseId) => {
    try {
      return await Course.destroy({
        where: {
          id: courseId
        }
      });
    } catch (err) {
      console.error(err);
      throw 'Deleting course fail';
    }
  }
};

export default courseService;
