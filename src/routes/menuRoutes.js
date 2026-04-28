import {getMenuItemsHandler, getMenuItemByIdHandler,createMenuItemHandler, removeMenuItemHandler, updateMenuItemHandler } from '../controllers/menuController.js'; 
import express from 'express'; 
import {authorizeRoles} from '../middleware/authorizeRoles.js';

const router = express.Router(); 

router.get('/', getMenuItemsHandler, authorizeRoles('admin', 'user')); 
router.get('/:id', getMenuItemByIdHandler);
router.post('/', createMenuItemHandler, authorizeRoles('admin')); 
router.put('/:id', updateMenuItemHandler, authorizeRoles('admin')); 
router.delete('/:id', removeMenuItemHandler, authorizeRoles('admin')); 


export default router;