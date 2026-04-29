import { fetchAllUsers, fetchUserById, fetchUserByEmail, addUser, modifyUser, removeUserById  } from '../service/userService.js';


export async function getAllUsersHandler(req, res){ 
    const users = await fetchAllUsers(); 
    res.status(200).json(users); 
} 

export async function getUserByIdHandler(req, res){ 
    const id = req.user.id; 
    const user = await fetchUserById(id); 
    res.status(200).json(user); 
}  

export async function getUserByEmailHandler(req, res){ 
    const email = req.query.email; 
    const user = await fetchUserByEmail(email); 
    res.status(200).json(user); 
}

export async function createUserHandler(req,res){ 
    const {email, password} = req.body;
    const newUser = await addUser({email, password});
    res.status(201).json(newUser); 
}

export async function updateUserHandler(req, res){ 
    const id = req.user.id; 
    const updatedData = req.body; 
    const updatedUser = await modifyUser(id, updatedData); 
    res.status(200).json(updatedUser);
}

export async function deleteUserHandler(req, res){ 
    const id = req.user.id; 
    await removeUserById(id); 
    res.status(204).send();
}