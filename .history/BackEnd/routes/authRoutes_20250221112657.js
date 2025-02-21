import express from 'express';
import { registerUser, loginUser, forgotPassword, resetPassword } from '../controllers/authController.js';

const router = express.Router();

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Forgot password
router.post('/forgot-password', forgotPassword);

// Reset password
router.post('/reset-password/:token', resetPassword);

export default router;
