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
        const error= "User with this email already exists"; 
        error.status=409; 
        throw error;
    }
    else{ 
        const newUser = await createUser(data); 
        return newUser;
    }
}  

export async function modifyUser(id, updatedData){ 
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
