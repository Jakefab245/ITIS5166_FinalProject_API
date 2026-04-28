import {getAllOrders, getOrderById, createOrder, removeOrder, updateOrder} from '../repo/orderRepo.js'; 


export async function fetchAllOrders(){ 
    return await getAllOrders(); 
}

export async function fetchOrderById(id){ 
    const order = await getOrderById(id); 
    if(order) return order; 
    else{ 
        const error = new Error('Order not found'); 
        error.status = 404; 
        throw error;
    } 
    return order;
} 


export async function addOrder(data){ 
    const newOrder = await createOrder(data); 
    return newOrder; 
} 

export async function modifyOrder(id, updatedData){ 
    const updatedOrder = await updateOrder(id, updatedData); 
    if(updatedOrder) return updatedOrder; 
    else{ 
        const error = new Error('Order not found'); 
        error.status = 404; 
        throw error;
    }
} 

export async function removeOrderById(id){ 
    const deletedOrder = await removeOrder(id); 
    if(deletedOrder) return deletedOrder; 
    else{ 
        const error = new Error('Order not found'); 
        error.status = 404; 
        throw error;
    }
}