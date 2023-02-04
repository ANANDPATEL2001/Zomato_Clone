import mongoose from 'mongoose';
import dotenv from 'dotenv';


export default async () => {
    return mongoose.connect(process.env.MONGO_URL, {
        // In case of any deprecation warning, we use followings (which are optional)
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}