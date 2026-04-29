import {getMenuItemsHandler, getMenuItemByIdHandler,createMenuItemHandler, removeMenuItemHandler, updateMenuItemHandler } from '../controller/menuController.js';
import express from 'express';
import {authenticate} from '../middleware/authenticate.js';
import {authorizeRoles} from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/', authenticate, authorizeRoles('ADMIN', 'USER'), getMenuItemsHandler);
router.get('/:id', authenticate, authorizeRoles('ADMIN', 'USER'), getMenuItemByIdHandler);
router.post('/', authenticate, authorizeRoles('ADMIN'), createMenuItemHandler);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), updateMenuItemHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), removeMenuItemHandler);


export default router;