import Sequelize from 'sequelize';
import 'dotenv/config';

const name = process.env.DATABASE_NAME;
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const host = process.env.DATABASE_HOST;
const dialect = 'postgres';
const logging = false;
const env = process.env.ENV;

const sequelize = new Sequelize(name, user, password, {
  host,
  dialect,
  logging,
  dialectOptions:
    env === 'production'
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      : null
});

export default sequelize;
