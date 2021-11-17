export const API_PORT = process.env.PORT || 3000;

export const SESSION_CONFIG = {
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 180 * 60 * 1000
  }
};
