import RedisService from './redis.service';

class AuthenticationCacheService {
  static getTokenBlacklistStatus(token) {
    return RedisService.connectionWrapper((client) => {
      return client
        .get(token)
        .then((isBlacklisted) => isBlacklisted === 'true');
    });
  }

  static blacklistToken(token, expireTime) {
    return RedisService.connectionWrapper((client) => {
      return client.set(token, 'true', {
        EX: expireTime
      });
    });
  }
}

export default AuthenticationCacheService;
