import HttpStatus from 'http-status-codes';
import { PRODUCT_ALREADY_EXISTS } from "../common/constants.js";

const ResponseFactory = {

  successResponse(response, resultData) {
    const responseData = response.status(HttpStatus.OK).json(resultData);
    return responseData;
  },

  internalServerErrorResponse(response, error) {
    let responseData;
    if (PRODUCT_ALREADY_EXISTS == error.message) {
      responseData = response.status(HttpStatus.FORBIDDEN).json(error.message);
    }else{
      responseData = response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
    return responseData;
  },

  unAuthorisedResponse(response, error) {
    const responseData = response.status(HttpStatus.UNAUTHORIZED).json(error.message);
    return responseData;
  },

  notFoundResponse(response) {
    const responseData = response.status(HttpStatus.NOT_FOUND).json(HttpStatus.getStatusText);
    return responseData;
  },

};

export default ResponseFactory;
