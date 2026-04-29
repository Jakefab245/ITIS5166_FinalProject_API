import { getAllUsersHandler, getUserByIdHandler, createUserHandler, updateUserHandler, deleteUserHandler} from '../controller/userController.js';
import express from 'express';
import {authenticate} from '../middleware/authenticate.js';
import {authorizeRoles} from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/', authenticate, authorizeRoles('ADMIN'), getAllUsersHandler);
router.get('/:id', authenticate, getUserByIdHandler);
router.post('/', createUserHandler);
router.put('/:id', authenticate, updateUserHandler);
router.delete('/:id', authenticate, deleteUserHandler);

export default router;