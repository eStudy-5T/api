// For sequelize cli
require('dotenv/config');

module.exports = {
  development: {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL
  }
}
