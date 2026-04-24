import {getReviewById, getAllReviews, createReview, updateReview, removeReview} from '../repo/reviewRepo.js'; 

export async function fetchAllReviews(){ 
    return await getAllReviews();
} 

export async function fetchReviewById(id){ 
    const review = await getReviewById(id); 
    if(review) return review; 
    else{ 
        const error = new Error('Review not found'); 
        error.status = 404; 
        throw error;
    }
} 

export async function addReview(data){ 
    const newReview = await createReview(data); 
    return newReview;
} 

export async function modifyReview(id, updatedData){ 
    const updatedReview = await updateReview(id, updatedData); 
    if(updatedReview) return updatedReview; 
    else{ 
        const error = new Error('Review not found'); 
        error.status = 404; 
        throw error;
    } 
} 
export async function removeReviewById(id){ 
    const deletedReview = await removeReview(id); 
    if(deletedReview) return deletedReview; 
    else{ 
        const error = new Error('Review not found'); 
        error.status = 404; 
        throw error;
    }
}