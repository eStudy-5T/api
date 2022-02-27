import Sequelize from 'sequelize';

const sequelize =
  process.env === 'production'
    ? new Sequelize(process.env.DATABASE_URL)
    : new Sequelize(
        process.env.DATABASE_NAME,
        process.env.DATABASE_USER,
        process.env.DATABASE_PASSWORD,
        {
          host: process.env.DATABASE_HOST,
          dialect: 'postgres',
          logging: false
        }
      );

export default sequelize;
