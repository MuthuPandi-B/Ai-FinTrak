import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB=async=()=>{
    try{
        const connect=await mongoose.connect(process.env.MON)
    }
}