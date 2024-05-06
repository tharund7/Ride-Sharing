import dotenv from 'dotenv'

dotenv.config();

export const emailKeys = {
    user: process.env.USER,

    password: process.env.PASSWORD
}