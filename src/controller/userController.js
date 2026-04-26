import { getAllUsers, getUserById, createUserService, updateUserRole, updateUser, postsByUserId, deleteUser } from '../services/userService.js';


export async function getAllUsersHandler(req, res){ 
    const users = await getAllUsers(); 
    res.status(200).json(users); 
} 

export async function getUserByIdHandler(req, res){ 
    const id = req.user.id; 
    const user = await getUserById(id); 
    res.status(200).json(user); 
} 

export async function createUserHandler(req,res){ 
    const {email, password} = req.body;
    const newUser = await createUserService({email, password});
    res.status(201).json(newUser);
}

export async function updateUserRoleHandler(req, res){ 
    const id = parseInt(req.params.id); 
    const {role} = req.body; 
    const updatedUser = await updateUserRole(id, role); 
    res.status(200).json(updatedUser); 
}

export async function updateUserHandler(req, res){ 
    const id = req.user.id; 
    const updatedData = req.body; 
    const updatedUser = await updateUser(id, updatedData); 
    res.status(200).json(updatedUser); 
}

export async function getPostsByUserIdHandler(req, res){ 
    const posts = await postsByUserId(req.user.id); 
    res.status(200).json(posts); 
}

export async function deleteUserHandler(req, res){ 
    const id = req.user.id; 
    await deleteUser(id); 
    res.status(204).send();
}