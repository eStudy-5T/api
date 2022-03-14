const config = {
  port: process.env.PORT || 3000,
  session: {
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 180 * 60 * 1000
    }
  },
  aws: {
    private: {
      region: process.env.AWS_BUCKET_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    bucketName: process.env.AWS_BUCKET_NAME
  },
  sendGrid: {
    apiKey: process.env.SENDGRID_API_KEY
  }
};

export default config;
