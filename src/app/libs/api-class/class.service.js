import Class from '../../core/database/models/class';
import Course from '../../core/database/models/course';

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
      throw 'Getting classes of a course fail';
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
      throw 'Creating class fail';
    }
  },

  getClassById: async (classId) => {
    try {
      return await Class.findByPk(classId);
    } catch (err) {
      console.error(err);
      throw 'Getting class fail';
    }
  },

  checkClassValidity: async (userId, classId) => {
    try {
      const clazz = await Class.findByPk(classId);
      if (!clazz) {
        return {code: 404, message: 'Class not found'};
      }

      const course = await Course.findOne({
        where: {
          id: clazz.courseId,
          ownerId: userId
        }
      });
      if (!course) {
        return {code: 403};
      }

      return null;
    } catch (err) {
      console.error(err);
      throw 'Checking class validity fail';
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
      throw 'Updating class fail';
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
      throw 'Deleting class fail';
    }
  }
};

export default classService;
