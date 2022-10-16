import AuthorizationDBService from '../dbServices/authorization-dbService.js';

const AuthorizationService = {
  validateUser: async (userRef) => {
    const authorizationDetails = await AuthorizationDBService.validateUser(userRef);
    return authorizationDetails;
  },
  authenticateUser: async ({ username, password }) => {
    const authenticatedUser = await AuthorizationDBService.authenticateUser(username, password);
    return authenticatedUser;
  },
  createUser: async (userData) => {
    const createdUser = await AuthorizationDBService.createUser(userData);
    return createdUser;
  },
};

export default AuthorizationService;
