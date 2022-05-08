import Enrollment from '../../core/database/models/enrollment.js';

const enrollmentServices = {
  getEnrollment: async (courseId, userId) => {
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
