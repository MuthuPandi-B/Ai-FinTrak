import express from 'express';
import { addTransaction, getTransactions, updateTransaction, deleteTransaction } from '../controllers/transactionController.js';

const router = express.Router();

router.post('/', addTransaction);
router.get('/', getTransactions);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;
