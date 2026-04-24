import prisma from '../config/db.js'; 

export async function getAllOrders(){ 
    return await prisma.Order.findMany(); 
} 

export async function getOrderById(id){ 
    const order = await prisma.Order.findUnique({where: {id}}); 
    return order;
}

export function createOrder(data){ 
    const order = prisma.Order.create({data}); 
    return order; 
}

export async function updateOrder(id, updatedData){ 
    try{ 
        const updatedOrder = await prisma.Order.update({where: {id}, data: updatedData}); 
        return updatedOrder;
    } 
    catch(error){ 
        if (error.code === 'P2025') return null; 
        throw error;
    }
} 


export async function removeOrder(id){ 
    try{ 
        const deletedOrder = await prisma.Order.delete({where: {id}}); 
        return deletedOrder; 
    } 
    catch(error){ 
        if(error.code === 'P2025') return null;
        throw error;
    }
}