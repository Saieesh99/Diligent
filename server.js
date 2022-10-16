import express from 'express';
import bodyParser from 'body-parser';
import { jwt } from './middleware/jwt.js';
import errorHandler from './middleware/error-handler.js';
import { appSettingConfig } from './config/config.js';
import userAuthRoute from './api/routes/userAuth-route.js';
import productRoute from './api/routes/product-route.js';
import LogService from './services/logger-service.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use JWT auth to secure the api
app.use(jwt());

app.use('/user', userAuthRoute);
app.use('/', productRoute);

// global error handlerjjj
app.use(errorHandler);

try {
  app.listen(appSettingConfig.NODE_PORT, () => {
    LogService.Log(`Express started on port ${appSettingConfig.NODE_PORT}`);
  });
} catch (error) {
  LogService.LogError(error);
}
