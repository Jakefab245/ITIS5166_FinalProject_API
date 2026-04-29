import {getReviewsHandler, getReviewByIdHandler,createReviewHandler,updateReviewHandler,removeReviewHandler} from '../controller/menuReviewController.js';
import express from 'express';
import {authenticate} from '../middleware/authenticate.js';
import {authorizeReviewOwnership} from '../middleware/authorizeOwnership.js';

const router = express.Router();

router.get('/', getReviewsHandler);
router.get('/:id', getReviewByIdHandler);
router.post('/', authenticate, createReviewHandler);
router.put('/:id', authenticate, authorizeReviewOwnership, updateReviewHandler);
router.delete('/:id', authenticate, authorizeReviewOwnership, removeReviewHandler);



export default router;