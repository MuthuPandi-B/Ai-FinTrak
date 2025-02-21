import express from 'express';
import 

const router = express.Router();

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Forgot password
router.post('/forgot-password', forgotPassword);

// Reset password
router.post('/reset-password/:resetToken', resetPassword);

export default router;
