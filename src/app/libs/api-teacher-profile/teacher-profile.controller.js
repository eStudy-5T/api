import {validate as uuidValidate} from 'uuid';
import helper from '../../utils/helper';
import teacherProfileService from './teacher-profile.service';

const teacherProfileController = {
  uploadProfile: (req, res) => {
    const data = req.body;
    const files = req.files;

    teacherProfileService
      .uploadProfile(data, files)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  }
};

export default teacherProfileController;
