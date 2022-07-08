import TeacherInfo from '../../core/database/models/teacher-info';
import emailService from '../../core/mailer/mail.service';
import senderType from '../../core/constants/sender-type';
import mailTemplateName from '../../core/constants/mail-template';
import userService from '../api-user/user.service';
import awsUploadService from '../../core/aws/file-upload.service';

const teacherProfileService = {
  uploadProfile: (data, files) => {
    try {
      console.log('data', data);
      console.log('files', files);
      const isYoutubeLink = !!data.sampleTeaching;

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
};

export default teacherProfileService;
