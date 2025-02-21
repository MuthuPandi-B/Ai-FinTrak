import express from 'express';
import { addTransaction, getTransactions, updateTransaction, deleteTransaction } from '../controllers/transactionController.js';
import { authMiddleware} from '../middlewares/authMiddleware.js';

const router = express.Router();

// Add a new transaction
router.post('/add',authMiddleware addTransaction);

// Get all transactions for the authenticated user
router.get('/', authMiddleware, getTransactions);

// Update a transaction
router.put('/:id',  authMiddleware, updateTransaction);

// Delete a transaction
router.delete('/:id',  authMiddleware, deleteTransaction);

export default router;
