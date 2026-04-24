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