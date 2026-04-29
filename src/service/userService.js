import bcrypt from 'bcrypt';
import {getAllUsers, getUserById, getUserByEmail, createUser, updateUser, removeUser} from '../repo/userRepo.js';

export async function fetchAllUsers(){ 
    return await getAllUsers();
} 

export async function fetchUserById(id){ 
    const user = await getUserById(id); 
    if(user){ 
        return user;
    } else{ 
        const error=new Error('User not found'); 
        error.status=404; 
        throw error;
    }
}

export async function fetchUserByEmail(email){ 
    const user = await getUserByEmail(email.toLowerCase()); 
    if(user){ 
        return user;
    } else{ 
        const error=new Error('User not found'); 
        error.status=404; 
        throw error;
    }
} 

//Necessary to include 409 error due to handling duplicate emails 
export async function addUser(data){ 
    const existingUser = await getUserByEmail(data.email.toLowerCase()); 
    if(existingUser){
        const error = new Error("User with this email already exists");
        error.status = 409;
        throw error;
    }
    else{
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await createUser({...data, password: hashedPassword});
        return newUser;
    }
}  

export async function modifyUser(id, updatedData){
    if(updatedData.password){
        updatedData = {...updatedData, password: await bcrypt.hash(updatedData.password, 10)};
    }
    const updatedUser = await updateUser(id, updatedData);
    if(updatedUser){ 
        return updatedUser;
    } 
    else{ 
        const error = new Error('User not found'); 
        error.status=404 
        throw error;
    }
} 

export async function removeUserById(id){ 
    const deletedUser = await removeUser(id); 
    if(deletedUser){ 
        return deletedUser;
    } 
    else{ 
        const error = new Error('User not found'); 
        error.status=404; 
        throw error;
    }
}
