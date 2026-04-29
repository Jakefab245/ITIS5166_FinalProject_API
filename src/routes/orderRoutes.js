import {getOrderByIdHandler, getOrdersHandler, createOrderHandler, removeOrderHandler, updateOrderHandler} from '../controller/orderController.js';
import express from 'express';
import {authenticate} from '../middleware/authenticate.js';
import {authorizeRoles} from '../middleware/authorizeRoles.js';
import {authorizeOrderOwnership} from '../middleware/authorizeOwnership.js';

const router = express.Router();

router.get('/', authenticate, authorizeRoles('ADMIN'), getOrdersHandler);
router.get('/:id', authenticate, authorizeOrderOwnership, getOrderByIdHandler);
router.post('/', authenticate, createOrderHandler);
router.put('/:id', authenticate, authorizeOrderOwnership, updateOrderHandler);
router.delete('/:id', authenticate, authorizeOrderOwnership, removeOrderHandler);


export default router;