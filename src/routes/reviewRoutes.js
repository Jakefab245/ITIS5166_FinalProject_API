import {getReviewsHandler, getReviewByIdHandler,createReviewHandler,updateReviewHandler,removeReviewHandler} from '../controllers/menuReviewController.js'; 
import express from 'express'; 



const router = express.Router(); 

router.get('/', getReviewsHandler); 
router.get('/:id', getReviewByIdHandler); 
router.post('/', createReviewHandler); 
router.put('/:id', updateReviewHandler); 
router.delete('/:id', removeReviewHandler); 



export default router;