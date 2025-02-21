import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './'

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
connectDB();

app.get('/',(req,res)=>{
    res.send("Hello from server");
});
app.use('/api/auth',authRoutes);
const PORT=process.env.PORT || 4000;
app.listen(PORT,console.log(`Server is running on port ${PORT}`));
