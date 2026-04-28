import { getAllUsersHandler, getUserByIdHandler, createUserHandler, updateUserRoleHandler, updateUserHandler, deleteUserHandler} from '../controllers/userController.js'; 



import express from 'express'; 
const router = express.Router(); 



router.get('/',getAllUsersHandler); 
router.get('/:id',getUserByIdHandler);
router.post('/',createUserHandler);
router.put('/:id',updateUserHandler);
router.delete('/:id',deleteUserHandler); 

export default router;