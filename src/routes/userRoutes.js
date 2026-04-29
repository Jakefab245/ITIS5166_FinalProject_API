import { getAllUsersHandler, getUserByIdHandler, createUserHandler, updateUserHandler, deleteUserHandler} from '../controller/userController.js';
import express from 'express';
import {authenticate} from '../middleware/authenticate.js';
import {authorizeRoles} from '../middleware/authorizeRoles.js';
import {validateSignUp, validateUpdateUser} from '../middleware/userValidators.js';

const router = express.Router();

router.get('/', authenticate, authorizeRoles('ADMIN'), getAllUsersHandler);
router.get('/:id', authenticate, getUserByIdHandler);
router.post('/', validateSignUp, createUserHandler);
router.put('/:id', authenticate, validateUpdateUser, updateUserHandler);
router.delete('/:id', authenticate, deleteUserHandler);

export default router;