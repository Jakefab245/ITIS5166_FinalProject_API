import {getMenuItemsHandler, getMenuItemByIdHandler,createMenuItemHandler, removeMenuItemHandler, updateMenuItemHandler } from '../controllers/menuController.js'; 
import express from 'express'; 
import {authorizeRoles} from '../middleware/authorizeRoles.js';

const router = express.Router(); 

router.get('/', authorizeRoles('admin', 'user') ,getMenuItemsHandler); 
router.get('/:id', getMenuItemByIdHandler);
router.post('/', authorizeRoles('admin') ,createMenuItemHandler); 
router.put('/:id',authorizeRoles('admin') ,updateMenuItemHandler); 
router.delete('/:id',authorizeRoles('admin') ,removeMenuItemHandler); 


export default router;