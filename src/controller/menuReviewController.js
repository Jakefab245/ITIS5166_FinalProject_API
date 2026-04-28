import {fetchAllReviews, fetchReviewById, addReview, removeReviewById, modifyReview} from '../service/reviewService.js';    

export async function getReviewsHandler(req, res){ 
    const reviews = await fetchAllReviews(); 
    res.status(200).json(reviews); 
}

export async function getReviewByIdHandler(req, res){ 
    const id = parseInt(req.params.id) 
    const review = await fetchReviewById(id); 
    res.status(200).json(review);
} 
export async function createReviewHandler(req, res){ 
    const data = req.body; 
    const newReview = await addReview(data); 
    res.status(201).json(newReview);
}  
export async function updateReviewHandler(req, res){ 
    const id = parseInt(req.params.id); 
    const updatedData = req.body; 
    const updatedReview = await modifyReview(id, updatedData); 
    res.status(200).json(updatedReview);
} 

export async function removeReivewHandler(req, res){ 
    const id = parseInt(req.params.id); 
    await removeReviewById(id); 
    res.status(204).send();
}