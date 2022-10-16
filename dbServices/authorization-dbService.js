import { v4 } from 'uuid';
import { User } from '../models/user.js';
import LoggerService from '../services/logger-service.js';
import { getSignedToken } from '../middleware/jwt.js';

const AuthorizationDBServive = {
  validateUser: async (userRef) => {
    try {
      const user = await User.findOne({
        attributes: ['Id'],
        where: { Reference: userRef },
      });
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      LoggerService.LogError(error.message);
      throw error;
    }
  },
  authenticateUser: async (username, password) => {
    try {
      const user = await User.findOne({
        attributes: ['Reference'],
        where: { Username: username, Password: password },
      });
      if (!user) throw new Error('Username or password is incorrect');
      return getSignedToken(user.Reference);
    } catch (error) {
      LoggerService.LogError(error.message);
      throw error;
    }
  },
  createUser: async (userData) => {
    try {
      const user = await User.findOne({
        where: { Username: userData.Username },
      });
      if (user) throw new Error('Username already exists in the database');

      const userDetails = {
        Reference: v4(),
        FirstName: userData.FirstName,
        LastName: userData.LastName,
        Username: userData.Username,
        Password: userData.Password,
      };
      const newDocument = await User.create(userDetails);
      return await User.findOne({
        attributes: ['Reference', 'FirstName', 'LastName', 'Username'],
        where: { Id: newDocument.Id },
      });
    } catch (error) {
      LoggerService.LogError(error.message);
      throw error;
    }
  },
};

export default AuthorizationDBServive;
