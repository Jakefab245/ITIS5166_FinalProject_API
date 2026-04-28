import {createMenuItem, getAllMenuItems, getMenuItemById, removeMenuItem, updateMenuItem} from '../repo/menuRepo.js'; 


export async function fetchAllMenuItems(){ 
    return await getAllMenuItems(); 
}

export async function fetchMenuItemById(id){ 
    const menuItem = await getMenuItemById(id); 
    if(menuItem) return menuItem; 
    else{ 
        const error = new Error('Menu item not found'); 
        error.status = 404; 
        throw error;
    }
} 

export async function addMenuItem(data){ 
    const existingItem = await getMenuItemById(data.name); 
    if(existingItem){ 
        const error = new Error('Menu item with this name already exists'); 
        error.status = 409; 
        throw error;
    }
    const newMenuItem = await createMenuItem(data); 
    return newMenuItem;
}

export async function modifyMenuItem(id, updatedData){ 
    const updatedMenuItem = await updateMenuItem(id, updatedData); 
    if(updatedMenuItem) return updatedMenuItem; 
    else{ 
        const error = new Error('Menu item not found'); 
        error.status = 404; 
        throw error;
    }
    return updatedMenuItem;
}

export async function removeMenuItemById(id){ 
    const deletedMenuItem = await removeMenuItem(id); 
    if(deletedMenuItem) return deletedMenuItem; 
    else{ 
        const error = new Error('Menu item not found'); 
        error.status = 404 
        throw error;
    } 
    return deletedMenuItem;
}
