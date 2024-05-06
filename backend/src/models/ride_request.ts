import { Schema, model, Types } from 'mongoose'
import Joi from 'joi'


export const Ride_RequestSchemaValidate = Joi.object({
    location: Joi.string().required(),
    destination: Joi.string().required(),
    specific_needs: Joi.string().required(),
    user_id: Joi.string().required(),
    pickup_latitude: Joi.number().precision(4).required(),
    pickup_longitude: Joi.number().precision(4).required(),
    dropoff_latitude: Joi.number().precision(4).required(), 
    dropoff_longitude: Joi.number().precision(2).required(),
    status: Joi.string().valid('pending', 'accepted', 'completed' , 'cancelled').required(),
})

export const Update_Ride_RequestSchemaValidate = Joi.object({
    location: Joi.string(),
    destination: Joi.string(),
    specific_needs: Joi.string(),
    user_id: Joi.string(),
    pickup_latitude: Joi.number().precision(4),
    pickup_longitude: Joi.number().precision(4),
    dropoff_latitude: Joi.number().precision(4),
    dropoff_longitude: Joi.number().precision(4),
    status: Joi.string().valid('pending', 'accepted', 'completed', 'cancelled'),
});

interface Ride_Request {
    location: string,
    destination: string,
    specific_needs: string,
    user_id: Types.ObjectId |string,
    pickup_latitude: number,
    pickup_longitude: number,
    dropoff_latitude: number,
    dropoff_longitude: number,
    status: 'pending' | 'accepted' | 'completed' | 'cancelled'
}

const ride_requestSchema = new Schema<Ride_Request>({
    location: {
        type: String,
    },
    
    destination: {
        type: String,
    },

    specific_needs: {
        type: String,
    },

    user_id: {
        type: Schema.Types.ObjectId, ref: "User"
    },

    pickup_latitude: {
        type: Number,
    },

    pickup_longitude: {
        type: Number,
    },
    
    dropoff_latitude: {
        type: Number,
    },
    
    dropoff_longitude: {
        type: Number,
    },
    
    status: {
        type: String,
        enum: ['pending', 'accepted', 'completed', 'cancelled'],
        default: 'pending'
    }
},
    {
        timestamps:true
    }
)

export const Ride_Request = model<Ride_Request>('Ride_Request', ride_requestSchema)