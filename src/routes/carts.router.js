import express from 'express';
import { purchaseCart, getCurrentCart, addToCart, updateProductQuantity, deleteProductFromCart } from '../controllers/carts.controller.js';
import { ensureRole } from '../middlewares/role.middleware.js';
import passport from 'passport';

const router = express.Router();

router.get('/current', passport.authenticate('jwt', { session: false }), getCurrentCart);
router.post('/', passport.authenticate('jwt', { session: false }), ensureRole('user'), addToCart);
router.put('/product/:productId', passport.authenticate('jwt', { session: false }), ensureRole('user'), updateProductQuantity);
router.delete('/product/:productId', passport.authenticate('jwt', { session: false }), ensureRole('user'), deleteProductFromCart);
router.post('/current/purchase', passport.authenticate('jwt', { session: false }), ensureRole('user'), purchaseCart);

export default router;