import {createClient} from 'redis';
import config from '../constants/app-config';

class RedisService {
  constructor() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = this;
    this.client = null;
  }

  static getConnection() {
    if (!this.client) {
      this.client = config.redis
        ? createClient({
            socket: {
              host: config.redis.host,
              port: config.redis.port
            }
          })
        : createClient();
    }

    return this.client;
  }

  static connectionWrapper(callback) {
    this.getConnection();

    let result;
    return this.client
      .connect()
      .then(() => {
        return config.redis
          ? this.client.auth({
              password: config.redis.password
            })
          : null;
      })
      .then(() => {
        return callback(this.client);
      })
      .then((callbackResult) => {
        result = callbackResult;
        return this.client.quit();
      })
      .then(() => {
        return result;
      });
  }
}

export default RedisService;
