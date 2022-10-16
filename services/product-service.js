import ProductDBService from '../dbServices/product-dbService.js';

const ProductService = {
  getProduct: async (userId, { limit, offset, currencyType }) => {
    const productData = await ProductDBService.getProduct(userId, limit, offset, currencyType);
    return productData;
  },
  createProduct: async (userId, productData) => {
    const newProductData = await ProductDBService.createProduct(userId, productData);
    return newProductData;
  },
  updateProduct: async (userId, productData) => {
    const updatedProductData = await ProductDBService.updateProduct(userId, productData);
    return updatedProductData;
  },
  deleteProduct: async (userId, productData) => {
    const deletedProductData = await ProductDBService.deleteProduct(userId, productData);
    return deletedProductData;
  },
};

export default ProductService;
