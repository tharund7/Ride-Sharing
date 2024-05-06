import { Schema, model } from 'mongoose'
import Joi from 'joi'

export const UserSchemaValidate = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('driver', 'rider', 'admin').optional(),
})

export const LoginSchemaValidate = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

interface User {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: 'driver' | 'rider' | 'admin',
    resetPasswordToken?: string,
    resetPasswordExpires?: Date,
}

const userSchema = new Schema<User>({
    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['driver', 'rider', 'admin'],
        default: 'rider',
    },
    
    resetPasswordToken: {
        type: String,
    },

    resetPasswordExpires: {
        type: Date
    },

},
    {
        timestamps:true
    }
)

userSchema.pre<User>('save', function (next) {
    this.first_name = capitalizeFirstLetterOfEachWord(this.first_name);
    next();
});

userSchema.pre<User>('save', function (next) {
    this.last_name = capitalizeFirstLetterOfEachWord(this.last_name);
    next();
});

function capitalizeFirstLetterOfEachWord(str: string): string {
    return str.replace(/\b\w/g, (matches) => matches.toUpperCase());
}

export const User = model<User>('User', userSchema)