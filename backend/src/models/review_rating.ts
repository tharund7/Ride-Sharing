import { Schema, model, Types } from 'mongoose'
import Joi from 'joi'


export const Review_RatingSchemaValidate = Joi.object({
    rating: Joi.number().required().max(10).min(1),
    review_text: Joi.string().required(),
    reviewer_id: Joi.string().required(),
    ride_id: Joi.string().required(),

})

interface Review_Rating {
    rating: number,
    review_text: string,
    reviewer_id: Types.ObjectId |string,
    ride_id: Types.ObjectId |string,
}

const review_ratingSchema = new Schema<Review_Rating>({
    rating: {
        type: Number,
    },
    
    review_text: {
        type: String,
    },

    reviewer_id: {
        type: Schema.Types.ObjectId, ref: "User"
    },

    ride_id: {
        type: Schema.Types.ObjectId, ref: "Ride_Request"
    },
},
    {
        timestamps:true
    }
)

export const Review_Rating = model<Review_Rating>('Review_Rating', review_ratingSchema)