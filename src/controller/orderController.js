import {fetchAllOrders, fetchOrderById, addOrder, removeOrderById, modifyOrder} from '../service/orderService.js'; 


export async function getOrdersHandler(req, res){ 
    const orders = await fetchAllOrders(); 
    res.status(200).json(orders);
} 

export async function getOrderByIdHandler(req, res){ 
    const id = parseInt(req.params.id); 
    const order = await fetchOrderById(id); 
    res.status(200).json(order);
}

export async function createOrderHandler(req, res){ 
    const data = req.body; 
    const newOrder = await addOrder(data); 
    res.status(201).json(newOrder);
} 

export async function updateOrderHandler(req, res){ 
    const id = parseInt(req.params.id); 
    const updatedData = req.body; 
    const updatedOrder = await modifyOrder(id, updatedData); 
    res.status(200).json(updatedOrder);
} 

export async function removeOrderHandler(req, res){ 
    const id = parseInt(req.params.id); 
    await removeOrderById(id); 
    res.status(204).send();
}