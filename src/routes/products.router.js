import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';
import { ensureRole } from '../middlewares/role.middleware.js';
import passport from 'passport';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', passport.authenticate('jwt', { session: false }), ensureRole('admin'), createProduct);
router.put('/:id', passport.authenticate('jwt', { session: false }), ensureRole('admin'), updateProduct);
router.delete('/:id', passport.authenticate('jwt', { session: false }), ensureRole('admin'), deleteProduct);

export default router;