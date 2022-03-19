import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../../core/constants/app-config';

const tokenService = {
  generateAccessToken: (userData) => {
    return jwt.sign(userData, config.jwt.secretAccessKey);
  },

  generateRefreshToken: (userData) => {
    return jwt.sign(userData, config.jwt.secretRefreshKey);
  },

  generateCryptoToken: async () => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(32, (err, buffer) => {
        if (err) reject(err);
        const token = buffer.toString('hex');
        resolve(token);
      });
    });
  }
};

export default tokenService;
