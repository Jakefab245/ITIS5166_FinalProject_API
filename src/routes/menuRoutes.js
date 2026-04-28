import {getMenuItemsHandler, getMenuItemByIdHandler,createMenuItemHandler, removeMenuItemHandler, updateMenuItemHandler } from '../controllers/menuController.js'; 
import express from 'express'; 
import {authorizeRoles} from '../middleware/authorizeRoles.js';

const router = express.Router(); 

router.get('/', authorizeRoles('ADMIN', 'USER') ,getMenuItemsHandler); 
router.get('/:id', getMenuItemByIdHandler);
router.post('/', authorizeRoles('ADMIN') ,createMenuItemHandler); 
router.put('/:id',authorizeRoles('ADMIN') ,updateMenuItemHandler); 
router.delete('/:id',authorizeRoles('ADMIN') ,removeMenuItemHandler); 


export default router;