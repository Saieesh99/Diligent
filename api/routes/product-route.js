import express from 'express';
import ProductCtrl from '../controllers/product-controller.js'

const { Router } = express;
const router = Router();

/**
 * Get Product API
 */
router.get('/product', ProductCtrl.getProduct);

/**
 * Create Product API
 */
router.post('/product', ProductCtrl.createProduct);

/**
 * Update Product API
 */
router.put('/product', ProductCtrl.updateProduct);

/**
 * Delete Product API
 */
router.delete('/product', ProductCtrl.deleteProduct);

export default router;
