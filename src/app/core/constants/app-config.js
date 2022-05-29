const config = {
  port: process.env.PORT || 3000,
  portalHost: process.env.APP_PORTAL_HOST_V2,
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
    senderSupportEmail: process.env.SENDER_SUPPORT_EMAIL,
    senderSupportName: process.env.SENDER_SUPPORT_NAME,
    senderNoreplyEmail: process.env.SENDER_NOREPLY_EMAIL,
    senderNoreplyName: process.env.SENDER_NOREPLY_NAME
  },
  sendGrid: {
    apiKey: process.env.SENDGRID_API_KEY
  },
  jwt: {
    secretAccessKey: process.env.JWT_SECRET_KEY_TOKEN,
    secretRefreshKey: process.env.JWT_SECRET_KEY_REFRESH_TOKEN,
    accessTokenExpiration: 3600000,
    refreshTokenExpiration: 86400000
  },
  cookie: {
    expiration: 86400000 // 1 day
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
  }
};

export default config;
