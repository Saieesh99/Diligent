import dotenv from 'dotenv';
import path from 'path';

const moduleURL = new URL(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(moduleURL.pathname);
const configLoaded = dotenv.config(path.dirname(`${__dirname}/.env`));

if (configLoaded.error) {
  console.log(`Missing config file. Exit from job : ${configLoaded.error}`);
}

export const DatabaseConfig = {
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: 'mysql',
  define: {
    freezeTableName: 'true',
  },
  dialectOptions: {
    connectTimeout: 20000,
  },
  pool: {
    maxConnections: 1,
    maxIdleTime: 3000,
  },
};

export const appSettingConfig = {
  NODE_ENV: process.env.NODE_ENV,
  NODE_PORT: process.env.NODE_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
};
