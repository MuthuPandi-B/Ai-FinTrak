import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUser =async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        const userExists=await User.findOne({email});
    if(userExists) return res.status(404).json({message:'User already exists'});
const hassedPassword= await bcrypt.hash(password,10);

    const user =await User.create({name,email,hassedPassword});
    await 
    }
}