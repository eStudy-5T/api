import classService from './class.service';
import helper from '../../utils/helper';

const classController = {
  getSpecificClass: (req, res) => {
    const {classId} = req.params;

    classService
      .getClassById(classId)
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
    const classData = req.body;

    classService
      .checkClassValidity(req.user.id, classId)
      .then((error) => {
        if (error) throw error;

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
      .checkClassValidity(req.user.id, classId)
      .then((error) => {
        if (error) throw error;

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
