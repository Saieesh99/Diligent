import expressJwt from 'express-jwt';
import jsonWebToken from 'jsonwebtoken';
import { appSettingConfig } from '../config/config.js';
import AuthorizationService from '../services/authorization-service.js';

export function jwt() {
  const secret = appSettingConfig.JWT_SECRET;
  return expressJwt({ secret, algorithms: ['HS256'] }).unless({
    path: [
      // public routes that don't require authentication
      '/user/login',
      '/user/signup',
    ],
  });
}

export function getSignedToken(userRef) {
  const token = jsonWebToken.sign({ sub: userRef }, appSettingConfig.JWT_SECRET, { expiresIn: '7d' });
  return { token };
}

export function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function authorizeUser({ authorization }) {
  const extractToken = authorization.split(' ')[1];
  const decodedUserRef = jsonWebToken.verify(extractToken, appSettingConfig.JWT_SECRET);
  const isValidUser = await AuthorizationService.validateUser(decodedUserRef.sub).catch((error) => { console.log('Error: ', error.message); });
  return isValidUser;
}
