import helper from '../../utils/helper';
import teacherProfileService from './teacher-profile.service';
import {PROFILE_STATUS} from '../../core/constants/teacher-profile';

const teacherProfileController = {
  uploadProfile: (req, res) => {
    const data = req.body;
    const files = req.files;
    const userId = req.user.id;
    teacherProfileService
      .uploadProfile(data, files, userId)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  getProfileById: (req, res) => {
    const {userId} = req.params;
    teacherProfileService
      .getProfile(userId)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  fetchAllCheckingProfile: (req, res) => {
    teacherProfileService
      .fetchAllCheckingProfile()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  acceptProfile: (req, res) => {
    const {profileId} = req.params;

    teacherProfileService
      .updateStatusProfile(profileId, PROFILE_STATUS.ACEPTED)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  },

  rejectProfile: (req, res) => {
    const {profileId} = req.params;

    teacherProfileService
      .updateStatusProfile(profileId, PROFILE_STATUS.REJECT)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        helper.apiHandler.handleErrorResponse(res, err);
      });
  }
};

export default teacherProfileController;
