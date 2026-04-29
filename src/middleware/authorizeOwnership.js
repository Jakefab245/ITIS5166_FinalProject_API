import { fetchMenuItemById } from '../service/menuService.js';
import {fetchOrderById} from '../service/orderService.js';  
import {fetchReviewById} from '../service/reviewService.js';

export async function authorizeOwnership(req, res, next) {
  const id = parseInt(req.params.id);
  const menuItem = await fetchMenuItemById(id);
  if (menuItem.userId !== req.user.id) {
    const error = new Error('Forbidden: insufficient permission.');
    error.status = 403;
    return next(error);
  }
  next();
} 

export async function authorizeOrderOwnership(req, res, next){ 
    const id = parseInt(req.params.id); 
    const order = await fetchOrderById(id);
    if(order.authorId !== req.user.id){
        const error = new Error('Forbidden: insufficient permission.'); 
        error.status = 403; 
        return next(error);
    } 
    next();
}

export async function authorizeReviewOwnership(req, res, next){ 
    const id = parseInt(req.params.id); 
    const review = await fetchReviewById(id);
    if(review.authorId !== req.user.id){
        const error = new Error('Forbidden: insufficient permission.'); 
        error.status = 403; 
        return next(error);
    } 
    next(); 
}
