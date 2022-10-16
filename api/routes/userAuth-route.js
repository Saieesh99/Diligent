import express from 'express';
// import UserNotes from '../controllers/userNotes-controller.js';
// import ProductCtrl from '../controllers/product-controller.js'
import UserAuthCtrl from '../controllers/userAuth-controller.js';

const { Router } = express;
const router = Router();

/**
 * Login API
 */
router.post('/login', UserAuthCtrl.authenticateUser);

/**
 * Signup API
 */
router.post('/signup', UserAuthCtrl.createUser);

export default router;
