import { fetchAllUsers, fetchUserById, fetchUserByEmail, addUser, modifyUser, removeUserById } from '../service/userService.js';

function assertSelfOrAdmin(req, paramId){
    if(req.user.role !== 'ADMIN' && req.user.id !== paramId){
        const error = new Error('Forbidden: insufficient permission.');
        error.status = 403;
        throw error;
    }
}

export async function getAllUsersHandler(req, res){
    const users = await fetchAllUsers();
    res.status(200).json(users);
}

export async function getUserByIdHandler(req, res){
    const id = parseInt(req.params.id);
    assertSelfOrAdmin(req, id);
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
    const id = parseInt(req.params.id);
    assertSelfOrAdmin(req, id);
    const updatedData = req.body;
    const updatedUser = await modifyUser(id, updatedData);
    res.status(200).json(updatedUser);
}

export async function deleteUserHandler(req, res){
    const id = parseInt(req.params.id);
    assertSelfOrAdmin(req, id);
    await removeUserById(id);
    res.status(204).send();
}