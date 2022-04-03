const config = {
  port: process.env.PORT || 3000,
  session: {
    secret: process.env.APP_SESSION_SECRET_KEY,
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
  mail: {
    senderEmail: process.env.SENDER_EMAIL,
    senderName: process.env.SENDER_NAME
  },
  sendGrid: {
    apiKey: process.env.SENDGRID_API_KEY
  },
  jwt: {
    secretAccessKey: process.env.JWT_SECRET_KEY_TOKEN,
    secretRefreshKey: process.env.JWT_SECRET_KEY_REFRESH_TOKEN,
    accessTokenExpiration: '30m',
    refreshTokenExpiration: '1d'
  },
  cookie: {
    expiration: 86400000 // 1 day
  }
};

export default config;
