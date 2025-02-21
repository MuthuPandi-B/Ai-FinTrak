import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUser =async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        const userExists=await User.findOne({email});
    if(userExists) return res.status(404).json({message:'User already exists'});
const hassedPassword= await bcrypt.hash(password,10);

    const user =new User.create({name,email,hassedPassword});
    await user.save();
    res.status(201).json({message:'User Registered successfully'});
    }catch(error){
        res.status(500).json({error:'Registration Failed'});
    }
};

export const loginUser =async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email{)
    }
}