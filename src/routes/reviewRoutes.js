import {getReviewsHandler, getReviewByIdHandler,createReviewHandler,updateReviewHandler,removeReviewHandler} from '../controller/menuReviewController.js';
import express from 'express';
import {authenticate} from '../middleware/authenticate.js';
import {authorizeRoles} from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/', getReviewsHandler);
router.get('/:id', getReviewByIdHandler);
router.post('/', authenticate, createReviewHandler);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), updateReviewHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), removeReviewHandler);



export default router;