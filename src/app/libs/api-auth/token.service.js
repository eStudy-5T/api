import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../../core/constants/app-config';

const tokenService = {
  generateAccessToken: (userData) => {
    return jwt.sign(userData, config.jwt.secretAccessKey, {
      expiresIn: config.jwt.accessTokenExpiration
    });
  },

  generateRefreshToken: (userData) => {
    return jwt.sign(userData, config.jwt.secretRefreshKey, {
      expiresIn: config.jwt.refreshTokenExpiration
    });
  },

  generateCryptoToken: () => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(32, (err, buffer) => {
        if (err) reject(err);
        const token = buffer.toString('hex');
        resolve(token);
      });
    });
  },

  extractUserDataFromToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      jwt.verify(refreshToken, config.jwt.secretRefreshKey, (err, user) => {
        if (err) {
          console.error(err);
          return reject('error.refreshTokenExpired');
        }
        delete user.iat;
        delete user.exp;
        resolve(user);
      });
    });
  }
};

export default tokenService;
