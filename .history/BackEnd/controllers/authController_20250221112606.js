// import User from "../models/User.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import sendEmail from "../services/emailService.js";
// //User Registration
// export const registerUser =async (req,res)=>{
//     const {name,email,password}=req.body;
//     try{
//         const userExists=await User.findOne({email});
//     if(userExists) return res.status(404).json({message:'User already exists'});
// const hassedPassword= await bcrypt.hash(password,10);

//     const user =new User({name,email,password:hassedPassword});
//     await user.save();
//     res.status(201).json({message:'User Registered successfully'});
//     }catch(error){
//         console.log(error)
//         res.status(500).json({error:'Registration Failed'});
//     }
// };
// //User Login
// export const loginUser =async(req,res)=>{
//     try{
//         const{email,password}=req.body;
//         const user=await User.findOne({email});
//         if(!user) return res.status(400).json({error:'User not found'});
//         const isMatch =await bcrypt.compare(password,user.password);
//         if(!isMatch) return res.status(400).json({error:'Invalid credentials'});
//         const token =jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:'1h'

//         });
//         res.json({token,name:user.name});
//     }catch(error){
//         res.status(500).json({error:'Login failed'});
//     }
// };
// //Forgot Password
// export const forgotPassword = async (req, res) => {
//     try {
//       const { email } = req.body;
//       const user = await User.findOne({ email });
//       if (!user) return res.status(400).json({ error: "User not found" });
  
//       // Generate token
//       const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
//         expiresIn: "1h",
//       });
  
//       // Send email with reset link
//       const resetLink = `http://loalhost:5173/reset-password/${token}`; 
//       await sendEmail(
//         email,
//         "Password Reset Request",
//         `You requested to reset your password. Click the link to reset it: ${resetLink}`
//       );
  
//       res.json({ message: "Password reset email sent successfully" });
//     } catch (error) {
  
//       res.status(500).json({ error: "Forgot password failed" });
//     }
//   };
  
  
//   export const resetPassword = async (req, res) => {
//     try {
//       const { token, newPassword } = req.body;
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const user = await User.findById(decoded.id);
//       if (!user) return res.status(400).json({ error: 'User not found' });
  
//       const hashedPassword = await bcrypt.hash(newPassword, 10);
//       user.password = hashedPassword;
//       await user.save();
//       res.json({ message: 'Password reset successfully' });
//     } catch (error) {
  
//       res.status(500).json({ error: 'Reset password failed' });
//     }
//   };
  
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/User.js';

// User Registration
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// User Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error: error.message });
  }
};

// Forgot Password - Send Reset Link
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.PASS_MAIL,
        pass: process.env.PASS_KEY,
      },
    });
   const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested to reset your password. Click the link to reset it: ${resetLink}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending password reset link', error: error.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params || 

  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error: error.message });
  }
};
