import prisma from '../config/db.js'; 

export async function getAllMenuItems(){ 
    return await prisma.Menu.findMany();
} 

export async function getMenuItemById(id){
    const menuItem =  await prisma.Menu.findUnique({ where: { id } });
    return menuItem;
}

export async function getMenuItemByName(name){
    const menuItem = await prisma.Menu.findUnique({ where: { name } });
    return menuItem;
}

export function createMenuItem(data){ 
    const menItem = prisma.Menu.create({data}); 
    return menItem;
} 

export async function updateMenuItem(id, updatedData){ 
    try { 
        const updatedItem = await prisma.Menu.update({ where: { id }, data: updatedData });
        return updatedItem;
    }  
    catch (error){ 
        if (error.code === 'P2025') return null; 
        throw error;
    }
}

export async function removeMenuItem(id){ 
    try{ 
        const deletedItem = await prisma.Menu.delete({where: {id}}); 
        return deletedItem;
    } catch (error) { 
        if (error.code === 'P2025') return null; 
        throw error;
    }
}