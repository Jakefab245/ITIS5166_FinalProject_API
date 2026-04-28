import {getOrderByIdHandler, getOrdersHandler, createOrderHandler, removeOrderHandler, updateOrderHandler} from '../controllers/orderController.js'; 
import express from 'express'; 
import {authorizeRoles} from '../middleware/authorizeRoles.js';

const router = express.Router(); 

router.get('/', getOrdersHandler, authorizeRoles('admin')); 
router.get('/:id', getOrderByIdHandler);
router.post('/', createOrderHandler); 
router.put('/:id', updateOrderHandler); 
router.delete('/:id', removeOrderHandler); 


export default router;