import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
//User Registration
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
//User Login
export const loginUser =async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({error:'User not found'});
        const isMatch =await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({error:'Invalid credentials'});
        const token =jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:'1h'

        });
        res.json({token,name:user.name});
    }catch(error){
        res.status(500).json({error:'Login failed'});
    }
};
//Forgot Password
export const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "User not found" });
  
      // Generate token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      // Send email with reset link
      const resetLink = `https://alearningplatform.netlify.app/reset-password/${token}`; 
      await sendEmail(
        email,
        "Password Reset Request",
        `You requested to reset your password. Click the link to reset it: ${resetLink}`
      );
  
      res.json({ message: "Password reset email sent successfully" });
    } catch (error) {
  
      res.status(500).json({ error: "Forgot password failed" });
    }
  };
  
  
  export const resetPassword = async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) return res.status(400).json({ error: 'User not found' });
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      res.json({ message: 'Password reset successfully' });
    } catch (error) {
  
      res.status(500).json({ error: 'Reset password failed' });
    }
  };
  