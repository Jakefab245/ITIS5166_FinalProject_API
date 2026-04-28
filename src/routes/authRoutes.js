import {} from '../controllers/authController.js'; 
import express from 'express'; 
import { validateSignUp } from '../middleware/userValidators.js';

const router = express.Router(); 

router.post('/signup', validateSignUp ,signUpController); 
router.post('/login', logInController);