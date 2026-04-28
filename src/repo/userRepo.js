import prisma from '../config/db.js'; 

export async function getAllUsers(){ 
    return await prisma.User.findMany(); 
}

export async function getUserById(id){ 
    const user = await prisma.User.findUnique({where:{id}}); 
    return user;
}


export async function getUserByEmail(email){ 
    const user = await prisma.User.findUnique({where:{email}}); 
    return user;
} 

export function createUser(data){ 
    try{ 
        const user = prisma.User.create({data}); 
        return user;
    } 
    catch(error){ 
        if(error.code === 'P2002'){ 
            const err = new Error(`User with email ${data.email} already exists`); 
            err.status = 409; 
            throw error;
        }  
        throw error;
    } 
}
export async function updateUserRoleById(id, newRole){ 
    try{ 
        if(prisma.user.role === "ADMIN"){ 
            const updatedUser = await prisma.user.update({where: {id}, data: {role: newRole}, omit:{password: true}}); 
            return updatedUser;  
        }
    } catch (error) {
        if(error.code === 404) {
            const err = new Error(`User with ${id} does not exist`); 
            err.status=404; 
            throw err; 
        }
        if(error.code === 'P2023'){ 
            const err = new Error(`User with ${id} is not authorized`); 
            err.status= 403; 
            throw err;

        }
        throw error;

    }
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