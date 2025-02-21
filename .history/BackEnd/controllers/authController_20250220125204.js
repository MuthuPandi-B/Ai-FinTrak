import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUser =async (req,res)=>{
    const {name,eamil,password}=req.body;
    try{
        const userExists=await User.findOne({email})
    }
}