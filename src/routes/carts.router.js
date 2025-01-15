import express from 'express';
import { purchaseCart, getCurrentCart, addToCart, updateProductQuantity, deleteProductFromCart } from '../controllers/carts.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { ensureRole } from '../middlewares/role.middleware.js';

const router = express.Router();

router.get('/current', authenticate, getCurrentCart);
router.post('/', authenticate, ensureRole('user', 'admin'), addToCart);
router.put('/product/:productId', authenticate, ensureRole('user', 'admin'), updateProductQuantity);
router.delete('/product/:productId', authenticate, ensureRole('user', 'admin'), deleteProductFromCart);
router.post('/current/purchase', authenticate, ensureRole('user', 'admin'), purchaseCart);

export default router;