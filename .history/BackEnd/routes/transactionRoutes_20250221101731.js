import express from 'express';
import { addTransaction, getTransactions, updateTransaction, deleteTransaction } from '../controllers/transactionController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Add a new transaction
router.post('/add', authenticateUser, addTransaction);

// Get all transactions for the authenticated user
router.get('/', authenticateUser, getTransactions);

// Update a transaction
router.put('/:id', authenticateUser, updateTransaction);

// Delete a transaction
router.delete('/:id', authenticateUser, deleteTransaction);

export default router;
