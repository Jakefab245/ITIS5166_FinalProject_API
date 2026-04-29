import { getAllUsersHandler, getUserByIdHandler, createUserHandler, updateUserHandler, deleteUserHandler} from '../controller/userController.js'; 
import express from 'express'; 


const router = express.Router(); 



router.get('/',getAllUsersHandler); 
router.get('/:id',getUserByIdHandler);
router.post('/',createUserHandler);
router.put('/:id',updateUserHandler);
router.delete('/:id',deleteUserHandler); 

export default router;