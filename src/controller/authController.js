import {signUp, logIn} from '../services/authService.js'; 

export async function signUpController(req, res){ 
    const {email, password, role} = req.body; 
    const newUser = await signUp(email, password, role); 
    res.status(201).json(newUser);
}

export async function logInController(req, res){ 
    const {email, password} = req.body; 
    const accessToken = await logIn(email, password); 
    res.status(200).json({accessToken}); 
}