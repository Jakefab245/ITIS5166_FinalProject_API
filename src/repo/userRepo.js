import prisma from '../config/db.js'; 

export async function getAllUsers(){ 
    return await prisma.User.findMany(); 
}

export async function getUserById(id){ 
    const user = await prisma.User.findUnque({where:{id}}); 
    return user;
}


export async function getUserByEmail(email){ 
    const user = await prisma.User.findUnique({where:{email}}); 
    return user;
} 

export function createUser(data){ 
    const user = prisma.User.create({data}); 
    return user;
} 

export async function updateUser(id, updatedData){ 
    try{ 
        const updatedUser = await prisma.User.update({where: {id}, data: updatedData}); 
        return updatedUser;
    } 
    catch(error){ 
        if(error.code === 'P2025') return null; 
        throw error;
    }
} 

export async function removeUser(id){ 
    try{ 
        const deletedUser = await prisma.User.delete({where: {id}}); 
        return deletedUser;
    } 
    catch(error){ 
        if(error.code === 'P2025') return null; 
        throw error;
    }
}