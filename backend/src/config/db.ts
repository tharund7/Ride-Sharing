import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const config = {
    databaseUri: process.env.MONGODB_URI
};

const options = {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}

export const db = mongoose.connect(config.databaseUri!, options)
.then(res => {
    if(res) {
        console.log(`Database connected successfully ✅`)
    }
}).catch(err => {
    console.log(err)
})