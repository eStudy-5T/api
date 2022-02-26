import classService from './class.service';
import courseService from '../api-course/course.service';
import helper from '../../utils/helper';

const classController = {
  getSpecificClass: (req, res) => {
    const {classId} = req.params;

    classService
      .getSpecificClass({
        where: {
          id: classId
        }
      })
      .then((clazz) => {
        if (!clazz) {
          return res.status(404).send('Class not found');
        }

        res.status(200).send(clazz);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  updateClass: (req, res) => {
    const {classId} = req.params;
    const {
      maxSlots,
      sessionCompletedCount,
      link,
      startDate,
      endDate,
      schedule,
      timezone,
      isAvailableToJoin,
      remainingSlots,
      duration
    } = req.body;

    const classData = {
      maxSlots,
      sessionCompletedCount,
      link,
      startDate,
      endDate,
      schedule,
      timezone,
      isAvailableToJoin,
      remainingSlots,
      duration
    };

    classService
      .getSpecificClass({
        where: {
          id: classId
        }
      })
      .then((clazz) => {
        if (!clazz) {
          return res.status(404).send('Class not found');
        }

        return courseService.getSpecificCourse({
          where: {
            id: clazz.courseId,
            ownerId: req.user.id
          }
        });
      })
      .then((course) => {
        if (!course) {
          return res.sendStatus(403);
        }

        return classService.updateClass(classId, classData);
      })
      .then((updatedClass) => {
        res.status(200).send(updatedClass);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  deleteClass: (req, res) => {
    const {classId} = req.params;

    classService
      .getSpecificClass({
        where: {
          id: classId
        }
      })
      .then((clazz) => {
        if (!clazz) {
          return res.status(404).send('Class not found');
        }

        return courseService.getSpecificCourse({
          where: {
            id: clazz.courseId,
            ownerId: req.user.id
          }
        });
      })
      .then((course) => {
        if (!course) {
          return res.sendStatus(403);
        }

        return classService.deleteClass(classId);
      })
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  }
};

export default classController;
