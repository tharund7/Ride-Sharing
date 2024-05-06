import express from 'express';
import { reviewRatingController } from '../controllers/reviewRatingController';

const router = express.Router();

router.post('/', reviewRatingController.createReviewRating);

router.get('/', reviewRatingController.getReviewRatings);

router.get('/:id', reviewRatingController.getReviewRatingById);

router.get('/by-ride/:rideId', reviewRatingController.getReviewsByRideId);

router.put('/:id', reviewRatingController.updateReviewRating);

router.delete('/:id', reviewRatingController.deleteReviewRating);

export { router as reviewRatingRouter };
