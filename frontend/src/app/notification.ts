import { Schema, model, Types } from 'mongoose'
import Joi from 'joi'


export const NotificationSchemaValidate = Joi.object({
    is_read: Joi.boolean().default(false).optional(),
    message: Joi.string().required(),
    user_id: Joi.string().required(),
})

interface Notification {
    is_read: boolean,
    message: string,
    user_id: Types.ObjectId |string,
}

const notificationSchema = new Schema<Notification>({
    
    message: {
        type: String,
    },

    is_read: {
        type: Boolean,
    },

    user_id: {
        type: Schema.Types.ObjectId, ref: "User"
    },
},
    {
        timestamps:true
    }
)

export const Notification = model<Notification>('Notification', notificationSchema)