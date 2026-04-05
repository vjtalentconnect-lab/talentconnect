import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.warn('[MongoDB] MONGODB_URI not set -- skipping MongoDB connection.');
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            maxPoolSize: 20,
            family: 4
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
