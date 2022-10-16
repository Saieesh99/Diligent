import ResponseFactory from '../../responseFactory/response-factory.js';
import ProductService from '../../services/product-service.js';
import { authorizeUser } from '../../middleware/jwt.js';

const ProductController = {
  getProduct: async (req, res) => {
    try {
      const user = await authorizeUser(req.headers);
      if (!user) throw new Error('No user found in the database with the given token');
      const result = await ProductService.getProduct(user.Id, req.query);
      if (result) {
        return ResponseFactory.successResponse(res, result);
      }
      return ResponseFactory.notFoundResponse();
    } catch (error) {
      return ResponseFactory.internalServerErrorResponse(res, error);
    }
  },
  createProduct: async (req, res) => {
    try {
      const user = await authorizeUser(req.headers);
      if (!user) throw new Error('No user found in the database with the given token');
      const result = await ProductService.createProduct(user.Id, req.body);
      if (result) {
        return ResponseFactory.successResponse(res, result);
      }
      return ResponseFactory.notFoundResponse();
    } catch (error) {
      return ResponseFactory.internalServerErrorResponse(res, error);
    }
  },
  updateProduct: async (req, res) => {
    try {
      const user = await authorizeUser(req.headers);
      if (!user) throw new Error('No user found in the database with the given token');
      const result = await ProductService.updateProduct(user.Id, req.body);
      if (result) {
        return ResponseFactory.successResponse(res, result);
      }
      return ResponseFactory.notFoundResponse();
    } catch (error) {
      return ResponseFactory.internalServerErrorResponse(res, error);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const user = await authorizeUser(req.headers);
      if (!user) throw new Error('No user found in the database with the given token');
      const result = await ProductService.deleteProduct(user.Id, req.body);
      if (result) {
        return ResponseFactory.successResponse(res, result);
      }
      return ResponseFactory.notFoundResponse();
    } catch (error) {
      return ResponseFactory.internalServerErrorResponse(res, error);
    }
  },
};

export default ProductController;
