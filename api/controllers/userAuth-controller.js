import ResponseFactory from '../../responseFactory/response-factory.js';
import UserAuthService from '../../services/authorization-service.js';

const UserNoteController = {
  authenticateUser: async (req, res) => {
    try {
      const result = await UserAuthService.authenticateUser(req.body);
      if (result) {
        return ResponseFactory.successResponse(res, result);
      }
      return ResponseFactory.notFoundResponse();
    } catch (error) {
      return ResponseFactory.unAuthorisedResponse(res, error);
    }
  },
  createUser: async (req, res) => {
    try {
      const result = await UserAuthService.createUser(req.body);
      if (result) {
        return ResponseFactory.successResponse(res, result);
      }
      return ResponseFactory.notFoundResponse();
    } catch (error) {
      return ResponseFactory.internalServerErrorResponse(res, error);
    }
  },
};

export default UserNoteController;
