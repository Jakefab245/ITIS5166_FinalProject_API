import prisma from '../config/db.js'; 

export async function getAllReviews(){ 
    return await prisma.Review.findMany(); 
} 

export async function getReviewById(id){ 
    const review = await prisma.Review.findUnique({where: {id}}); 
    return review;
} 

export function createReview(data){ 
    const review = prisma.Review.create({data}); 
    return review;
} 

export async function updateReview(id, updatedData){ 
    try{ 
        const updatedReview = await prisma.Review.update({where: {id}, data: updatedData}); 
        return updatedReview;
    } 
    catch(error){ 
        if(error.code === 'P2025') return null; 
        throw error;
    } 
} 

export async function removeReview(id){ 
    try{ 
        const deletedReview = await prisma.Review.delete({where: {id}}); 
        return deletedReview;
    } 
    catch(error){ 
        if(error.code === 'P2025') return null;
        throw error;
    }
}