import S3 from 'aws-sdk/clients/s3';
import config from '../constants/app-config';

const s3 = new S3(config.aws.private);

const awsUploadService = {
  getBaseUrl: () => {
    return `https://${config.aws.bucketName}.s3.amazonaws.com`;
  },

  uploadFile: (file, relativePath) => {
    const bucketPath = `${config.aws.bucketName}/${relativePath}`;

    const s3Params = {
      Bucket: bucketPath,
      Body: file.data,
      Key: file.name.toLowerCase(),
      ContentType: file.mimetype,
      Expires: 60,
      ACL: 'public-read'
    };

    return s3.upload(s3Params).promise();
  },

  removeFile: (fileName, relativePath) => {
    const bucketPath = `${config.aws.bucketName}/${relativePath}`;

    const s3Params = {
      Bucket: bucketPath,
      Key: fileName
    };

    return s3.deleteObject(s3Params).promise();
  }
};

export default awsUploadService;
