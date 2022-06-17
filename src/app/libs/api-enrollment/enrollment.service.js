import Enrollment from '../../core/database/models/enrollment.js';
import User from '../../core/database/models/user.js';

const enrollmentServices = {
  getEnrollments: async (courseId) => {
    return Enrollment.findAll({
      where: {
        courseId
      },
      include: {
        model: User,
        attributes: []
      },
      attributes: ['userId', 'courseId', 'user.email'],
      raw: true
    });
  },

  getSpecificEnrollment: async (courseId, userId) => {
    return Enrollment.findOne({
      where: {
        courseId,
        userId
      },
      raw: true
    });
  }
};

export default enrollmentServices;
