import Class from '../../core/database/models/class';
import Course from '../../core/database/models/course';
import Enrollment from '../../core/database/models/enrollment';
import User from '../../core/database/models/user';

const classService = {
  getClassesByCourseId: async (courseId) => {
    try {
      return await Class.findAll({
        where: {
          courseId
        }
      });
    } catch (err) {
      console.error(err);
      throw 'error.getClassFail';
    }
  },

  createClass: async (courseId, classData) => {
    try {
      return await Class.create({
        courseId,
        ...classData
      });
    } catch (err) {
      console.error(err);
      throw 'error.createClassFail';
    }
  },

  getClassById: async (classId) => {
    try {
      return await Class.findByPk(classId);
    } catch (err) {
      console.error(err);
      throw 'error.getClassFail';
    }
  },

  checkClassValidity: async (userId, classId) => {
    try {
      const classData = await Class.findByPk(classId);
      if (!classData) {
        return {status: 404, message: 'Class not found'};
      }

      const course = await Course.findOne({
        where: {
          id: classData.courseId,
          ownerId: userId
        }
      });
      if (!course) {
        return {status: 403};
      }

      return null;
    } catch (err) {
      console.error(err);
      throw '';
    }
  },

  updateClass: async (classId, classData) => {
    try {
      const result = await Class.update(classData, {
        where: {
          id: classId
        },
        returning: true
      });

      return result[1];
    } catch (err) {
      console.error(err);
      throw 'error.updateClassFail';
    }
  },

  deleteClass: async (classId) => {
    try {
      return await Class.destroy({
        where: {
          id: classId
        }
      });
    } catch (err) {
      console.error(err);
      throw 'error.deleteClassFail';
    }
  },

  getClassEnrollments: async (courseId, classIds) => {
    try {
      return await Enrollment.findAll({
        where: {
          courseId,
          classId: classIds
        },
        include: {
          model: User,
          required: true,
          attributes: [
            'id',
            'email',
            'firstName',
            'lastName',
            'avatar',
            'dateOfBirth',
            'nationality'
          ]
        }
      });
    } catch (err) {
      console.error(err);
      throw 'error.getEnrollmentFail';
    }
  },

  enrollStudent: async (userId, courseId, classId) => {
    try {
      return await Enrollment.create({
        userId,
        courseId,
        classId
      });
    } catch (err) {
      console.error(err);
      throw 'error.enrollFail';
    }
  }
};

export default classService;
