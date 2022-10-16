import Sequelize from 'sequelize';
import { DatabaseConfig } from './config.js';

// eslint-disable-next-line import/prefer-default-export
export const dbConnection = new Sequelize(
  DatabaseConfig.database,
  DatabaseConfig.username,
  DatabaseConfig.password,
  DatabaseConfig,
);

dbConnection
  .authenticate()
  .then(() => {
    console.log(`Connection has been established successfully to database ${DatabaseConfig.database}`);
  })
  .catch((err) => {
    console.error(`Unable to connect to the database ${DatabaseConfig.database}`, err);
  });
