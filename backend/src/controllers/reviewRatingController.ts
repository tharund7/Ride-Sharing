import { Request, Response } from 'express';
import { Review_Rating, Review_RatingSchemaValidate } from '../models/review_rating';

class ReviewRatingController {
  async createReviewRating(req: Request, res: Response) {
    const data = req.body;

    const { error, value } = Review_RatingSchemaValidate.validate(data);

    if (error) {
      res.status(400).json({message: error.message});
    } else {
      try {
        const existingReview = await Review_Rating.findOne({ ride_id: value.ride_id });

        if (existingReview) {
          return res.status(400).json({message: 'Review already exists'});
        }

        const newReviewRating = await Review_Rating.create(value);
        res.status(201).json(newReviewRating);
      } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
      }
    }
  }

  async getReviewRatings(req: Request, res: Response) {
    try {
      const reviewRatings = await Review_Rating.find({});
      res.json(reviewRatings);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  }

  async getReviewRatingById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const reviewRating = await Review_Rating.findById(id);

      if (!reviewRating) {
        return res.status(404).json({message: 'Review rating not available'});
      }

      res.json(reviewRating);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  }

  async getReviewsByRideId(req: Request, res: Response) {
    const rideId = req.params.rideId;

    try {
      const reviews = await Review_Rating.find({ ride_id: rideId });

      res.json(reviews);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async updateReviewRating(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const updatedReviewRating = await Review_Rating.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedReviewRating) {
        return res.status(404).json({message: 'Review rating not available'});
      }

      res.json(updatedReviewRating);
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  }

  async deleteReviewRating(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const deletedReviewRating = await Review_Rating.findByIdAndDelete(id);

      if (!deletedReviewRating) {
        return res.status(404).json({message:'Review rating not available'});
      }

      res.json({message: 'Review rating deleted'});
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  }
}

export const reviewRatingController = new ReviewRatingController();
