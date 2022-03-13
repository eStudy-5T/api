import S3 from 'aws-sdk/clients/s3';

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region: AWS_BUCKET_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

const awsUploadService = {
  getBaseUrl: () => {
    return `https://${AWS_BUCKET_NAME}.s3.${AWS_BUCKET_REGION}.amazonaws.com`;
  },

  uploadFile: (file, relativePath) => {
    const bucketPath = `${AWS_BUCKET_NAME}/${relativePath}`;

    const s3Params = {
      Bucket: bucketPath,
      Body: file.data,
      Key: file.name,
      ContentType: file.mimetype,
      Expires: 60,
      ACL: 'public-read'
    };

    return s3.upload(s3Params).promise();
  },

  removeFile: (fileName, relativePath) => {
    const bucketPath = `${AWS_BUCKET_NAME}/${relativePath}`;

    const s3Params = {
      Bucket: bucketPath,
      Key: fileName
    };

    return s3.deleteObject(s3Params).promise();
  }
};

export default awsUploadService;
