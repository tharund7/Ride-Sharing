import { Schema, model, Types } from 'mongoose'
import Joi from 'joi'


export const TransactionSchemaValidate = Joi.object({
    payer_id: Joi.string().required(),
    ride_id: Joi.string().required(),
    amount: Joi.number().precision(2).required(),
    status: Joi.string().valid('successful', 'pending', 'disputed').required(),
})

interface Transaction {
    payer_id: Types.ObjectId |string,
    ride_id: Types.ObjectId |string,
    amount: number,
    status: 'successful' | 'pending' | 'disputed',
}

const transactionSchema = new Schema<Transaction>({
    amount: {
        type: Number,
    },

    payer_id: {
        type: Schema.Types.ObjectId, ref: "User"
    },

    ride_id: {
        type: Schema.Types.ObjectId, ref: "Ride_Request"
    },

    status: {
        type: String,
        enum: ['successful', 'pending', 'disputed',],
        default: 'pending',
    },
},
    {
        timestamps:true
    }
)

export const Transaction = model<Transaction>('Transaction', transactionSchema)