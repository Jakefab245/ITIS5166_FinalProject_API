import prisma from '../config/db.js'; 

export async function getAllMenuItems(){ 
    return await prisma.menuItem.findMany();
} 

export async function getMenuItemById(id){ 
    const menuItem =  await prisma.menuItem.findUnique({ where: { id } }); 
    return menuItem;
} 

export function createMenuItem(data){ 
    const menItem = prisma.menuItem.create({data}); 
    return menItem;
} 

export async function updateMenuItem(id, updatedData){ 
    try { 
        const updatedItem = await prisma.menuItem.update({ where: { id }, updatedData });
        return updatedItem;
    }  
    catch (error){ 
        if (error.code === 'P2025') return null; 
        throw error;
    }
}

export async function removeMenuItem(id){ 
    try{ 
        const deletedItem = await prisma.menuItem.delete({where: {id}}); 
        return deletedItem;
    } catch (error) { 
        if (error.code === 'P2025') return null; 
        throw error;
    }
}