import { v4 } from 'uuid';
import BaseModel from '../models/base-model.js';
import { User } from '../models/user.js';
import { Product } from '../models/product.js';
import LoggerService from '../services/logger-service.js';
import { PRODUCT_ALREADY_EXISTS, UPDATE_FAILURE, DELETE_FAILURE, AUTH_FAILURE, SUPPORTED_CURRENCIES } from "../common/constants.js";
import { getPriceByCurrency } from '../common/utils.js';

const Sequelize = BaseModel.getSequelizeInstance();

const ProductDBServive = {
  getProduct: async (userId, limit, offset, currencyType) => {
    try {
      const limitProvided = (limit && Number.isInteger(parseInt(limit))) ? parseInt(limit) : 5;
      const offsetProvided = (offset && Number.isInteger(parseInt(offset))) ? parseInt(offset) : 0;
      const product = await Product.findAndCountAll({
        attributes: ['Reference', 'Name', 'Price', 'Currency', 'Description'],
        include: [{
          model: User,
          as: 'user',
          attributes: ['Reference', 'FirstName', 'LastName', 'Username'],
          required: true,
        }],
        where: { IsDeleted: 0 },
        limit: limitProvided,
        offset: offsetProvided,
      });
      if (!product) throw new Error(AUTH_FAILURE);

      if (currencyType) {
        let allProducts = JSON.parse(JSON.stringify(product.rows))
        for (let i = 0; i < allProducts.length; i++) {
          let { price, toCurrency } = await getPriceByCurrency(allProducts[i], currencyType);
          allProducts[i].Price = price;
          allProducts[i].Currency = toCurrency;
        }
        return allProducts;
      }
      return product;
    } catch (error) {
      LoggerService.LogError(error.message);
      throw error;
    }
  },
  createProduct: async (userId, product) => {
    try {
      if (Object.keys(product).length > 0) {
        if (!product.Name) return 'Product name is mandatory field';
        if (!product.Price) return 'Product price is mandatory field';
        if (!product.Currency) return 'Product currency is mandatory field';
        if (!SUPPORTED_CURRENCIES.includes(product.Currency)) {
          return `Product currency is not included in supported currencies list: ${SUPPORTED_CURRENCIES.join()}`;
        }
        const productExists = await Product.findOne({
          where: { Name: product.Name },
        });
        if (productExists) throw new Error(PRODUCT_ALREADY_EXISTS);

        let { price, toCurrency } = await getPriceByCurrency(product, null);

        const productData = {
          Reference: v4(),
          Name: product.Name,
          Price: price,
          Currency: toCurrency,
          Description: product.Description,
          UserId: userId,
        };
        const newDocument = await Product.create(productData);
        return await Product.findOne({
          attributes: ['Reference', 'Name', 'Price', 'Currency', 'Description'],
          include: [{
            model: User,
            as: 'user',
            attributes: ['Reference', 'FirstName', 'LastName', 'Username'],
            required: true,
          }],
          where: { Id: newDocument.Id },
        });
      } else {
        return 'No product data provided to be created.'
      }
    } catch (error) {
      LoggerService.LogError(error.message);
      throw error;
    }
  },
  updateProduct: async (userId, product) => {
    try {
      if (Object.keys(product).length > 0) {
        const productData = await Product.findOne({
          where: { Reference: product.Reference },
        });
        if (!productData) throw new Error(UPDATE_FAILURE);

        productData.Name = product.Name ? product.Name : productData.Name;
        productData.Price = product.Price ? product.Price : productData.Price;
        productData.Currency = product.Currency ? product.Currency : productData.Currency;
        if (!SUPPORTED_CURRENCIES.includes(productData.Currency)) {
          return `Product currency is not included in supported currencies list: ${SUPPORTED_CURRENCIES.join()}`;
        }
        productData.Description = product.Description ? product.Description : productData.Description;
        productData.UserId = userId;
        productData.UpdatedOn = Sequelize.literal('CURRENT_TIMESTAMP');
        await productData.save();
        return await Product.findOne({
          attributes: ['Reference', 'Name', 'Price', 'Currency', 'Description'],
          where: { Reference: productData.Reference },
        });
      } else {
        return 'No product data provided to be updated.'
      }
    } catch (error) {
      LoggerService.LogError(error.message);
      throw error;
    }
  },
  deleteProduct: async (userId, product) => {
    try {
      if (Object.keys(product).length > 0) {
        const productData = await Product.findOne({
          where: { Reference: product.Reference },
        });
        if (!productData) throw new Error(DELETE_FAILURE);

        productData.IsDeleted = 1;
        productData.UserId = userId;
        productData.UpdatedOn = Sequelize.literal('CURRENT_TIMESTAMP');
        await productData.save();
        return await Product.findOne({
          attributes: ['Reference', 'Name'],
          where: { Reference: productData.Reference },
        });
      }
    } catch (error) {
      LoggerService.LogError(error.message);
      throw error;
    }
  },
};

export default ProductDBServive;



