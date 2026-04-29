import {getOrderByIdHandler, getOrdersHandler, createOrderHandler, removeOrderHandler, updateOrderHandler} from '../controller/orderController.js';
import express from 'express';
import {authenticate} from '../middleware/authenticate.js';
import {authorizeRoles} from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/', authenticate, authorizeRoles('ADMIN'), getOrdersHandler);
router.get('/:id', authenticate, authorizeRoles('ADMIN'), getOrderByIdHandler);
router.post('/', authenticate, createOrderHandler);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), updateOrderHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), removeOrderHandler);


export default router;