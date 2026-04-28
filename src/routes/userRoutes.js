import { getAllUsersHandler, getUserByIdHandler, createUserHandler, updateUserRoleHandler, updateUserHandler, deleteUserHandler} from '../controllers/userController.js'; 



import express from 'express'; 
const app = express.Router(); 



app.get('/',getAllUsersHandler); 
app.get('/:id',getUserByIdHandler);
app.post('/',createUserHandler);
app.put('/:id',updateUserHandler);
app.delete('/:id',deleteUserHandler); 

export default app;