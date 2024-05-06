import { Schema, model, Types } from 'mongoose'
import Joi from 'joi'


export const Ride_AssignmentSchemaValidate = Joi.object({
    ride_request_id: Joi.string().required(),
    driver_id: Joi.string().required(),
    location: Joi.string().required(),
    estimated_arrival_time: Joi.string().required(),
    ride_status: Joi.string().valid('ongoing', 'completed',).required(),
})

interface Ride_Assignment {
    ride_request_id: Types.ObjectId |string,
    location: string,
    driver_id: Types.ObjectId |string,
    estimated_arrival_time: string,
    ride_status: 'ongoing' | 'completed'
}

const ride_assignmentSchema = new Schema<Ride_Assignment>({
    ride_request_id: {
        type: Schema.Types.ObjectId, ref: "Ride_Request"
    },
    

    location: {
        type: String,
    },

    driver_id: {
        type: Schema.Types.ObjectId, ref: "User"
    },

    estimated_arrival_time: {
        type: String,
    },
    
    ride_status: {
        type: String,
        enum: ['ongoing', 'completed'],
        default: 'ongoing',
    }
},
    {
        timestamps:true
    }
)

export const Ride_Assignment = model<Ride_Assignment>('Ride_Assignment', ride_assignmentSchema)