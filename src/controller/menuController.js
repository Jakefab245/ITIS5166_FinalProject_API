import {fetchAllMenuItems,  
    fetchMenuItemById,  
    addMenuItem,  
    removeMenuItemById,  
    modifyMenuItem} from '../service/menuService.js'; 


export async function getMenuItemsHandler(req, res){ 
    const menuItems = await fetchAllMenuItems(); 
    res.status(200).json(menuItems); 
} 

export async function getMenuItemByIdHandler(req, res){ 
    const id = parseInt(req.params.id); 
    const menuItem = await fetchMenuItemById(id); 
    res.status(200).json(menuItem);
}

export async function createMenuItemHandler(req, res){ 
    const data = req.body; 
    const newMenuItem = await addMenuItem(data); 
    res.status(201).json(newMenuItem);
} 

export async function updateMenuItemHandler(req, res){ 
    const id = parseInt(req.params.id); 
    const updatedData = req.body; 
    const updatedMenuItem = await modifyMenuItem(id, updatedData); 
    res.status(200).json(updatedMenuItem);
}

export async function removeMenuItemHandler(req, res){
    const id = parseInt(req.params.id); 
    await removeMenuItemById(id); 
    res.status(204).send();
}
