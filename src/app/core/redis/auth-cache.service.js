import RedisService from './redis.service';
import config from '../constants/app-config';

class AuthenticationCacheService {
  static getTokenBlacklistStatus(token) {
    if (!token || !config.redis?.isEnabled) {
      return Promise.resolve(false);
    }
    return RedisService.connectionWrapper((client) => {
      return client
        .get(token)
        .then((isBlacklisted) => isBlacklisted === 'true');
    });
  }

  static blacklistToken(token, expireTime) {
    if (!token || !expireTime || !config.redis?.isEnabled) {
      return Promise.resolve();
    }

    return RedisService.connectionWrapper((client) => {
      return client.set(token, 'true', {
        EX: expireTime
      });
    });
  }
}

export default AuthenticationCacheService;
