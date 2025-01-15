import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { ensureRole } from '../middlewares/role.middleware.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authenticate, ensureRole('admin'), createProduct);
router.put('/:id', authenticate, ensureRole('admin'), updateProduct);
router.delete('/:id', authenticate, ensureRole('admin'), deleteProduct);

export default router;