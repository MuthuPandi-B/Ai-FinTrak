import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];//Extract token after 'Bearer'
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(re)
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

