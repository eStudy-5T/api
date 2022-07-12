import TeacherInfo from '../../core/database/models/teacher-info';
import get from 'lodash/get';
import emailService from '../../core/mailer/mail.service';
import senderType from '../../core/constants/sender-type';
import mailTemplateName from '../../core/constants/mail-template';
import userService from '../api-user/user.service';
import awsUploadService from '../../core/aws/file-upload.service';
import {PROFILE_STATUS} from '../../core/constants/teacher-profile';

const teacherProfileService = {
  uploadFile: async (file, path, userId) => {
    try {
      const relativePath = `profile/${userId}/${path}`;
      const result = await awsUploadService.uploadFile(file, relativePath);
      const avatarLink = get(result, 'Location');
      return avatarLink;
    } catch (error) {
      throw new Error(error);
    }
  },

  uploadProfile: async (data, files, userId) => {
    try {
      const isSampleYoutubeLink = !!data.sampleTeaching;
      let avatarLink;
      if (files && files.teacherAvatar) {
        avatarLink = await teacherProfileService.uploadFile(
          files.teacherAvatar,
          'avatar',
          userId
        );
      }

      // if not youtubelink send file to AWS
      let sampleTeachingLink;
      if (!isSampleYoutubeLink && files && files.sampleTeaching) {
        sampleTeachingLink = await teacherProfileService.uploadFile(
          files.sampleTeaching,
          'sample-teach',
          userId
        );
      } else {
        sampleTeachingLink = data.sampleTeaching;
      }

      if (avatarLink) {
        data.teacherAvatar = avatarLink;
      }
      data.sampleTeaching = sampleTeachingLink;
      data.experiences = JSON.parse(data.experiences);
      const existedProfile = await teacherProfileService.getProfile(userId);
      // Create or update profile
      const profile = {
        ...data,
        userId,
        version: existedProfile ? existedProfile.version + 1 : 1,
        profileStatus: PROFILE_STATUS.CHECKING
      };
      let createOrUpdateStatus;
      if (existedProfile) {
        createOrUpdateStatus = await TeacherInfo.update(profile, {
          where: {
            id: existedProfile.id
          }
        });
      } else {
        createOrUpdateStatus = await TeacherInfo.create(profile);
      }
      // Update user has submitted a teacher profile
      await userService.update(userId, {isSubmitted: true});
      // Send Notice Mail
      const user = await userService.getCurrentUser(userId);
      teacherProfileService.sendConfirmMailAfterSubmit(user);
      // Service done
      return createOrUpdateStatus;
    } catch (error) {
      throw new Error(error);
    }
  },

  getProfile: async (userId) => {
    try {
      const profile = TeacherInfo.findOne({
        where: {
          userId: userId
        },
        returning: true,
        raw: true
      });
      return profile;
    } catch (error) {
      throw new Error(error);
    }
  },

  sendConfirmMailAfterSubmit: async (user) => {
    try {
      const mailData = {
        fullName: `${user.firstName} ${user.lastName}`
      };

      return await emailService.sendMail(
        user.email,
        senderType.noreply,
        mailTemplateName.profileSubmitted.subject,
        mailTemplateName.profileSubmitted.path,
        mailData
      );
    } catch (err) {
      throw new Error(err);
    }
  },

  fetchAllCheckingProfile: async () => {
    try {
      const checkingProfile = await TeacherInfo.findAll({
        where: {
          profileStatus: PROFILE_STATUS.CHECKING
        }
      });
      return checkingProfile;
    } catch (err) {
      throw new Error(err);
    }
  },

  updateStatusProfile: async (profileId, status) => {
    try {
      const updateResult = await TeacherInfo.update(
        {profileStatus: status},
        {
          where: {
            id: profileId
          }
        }
      );
      if (status === PROFILE_STATUS.ACCEPTED) {
        const profile = await TeacherInfo.findOne({
          where: {
            id: profileId
          },
          returning: true,
          raw: true
        });
        const user = await userService.getCurrentUser(profile.userId);
        const updateTeachPermission = await userService.update(user.id, {
          isVerifiedToTeach: true
        });

        return updateTeachPermission;
      }
      return updateResult;
    } catch (err) {
      throw new Error(err);
    }
  }
};

export default teacherProfileService;
