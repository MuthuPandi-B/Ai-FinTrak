const express = require('express');
const { addTransaction, getTransactions, updateTransaction, deleteTransaction } = require('../controllers/transactionController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

// Add a new transaction
router.post('/add', authenticateUser, addTransaction);

// Get all transactions for the authenticated user
router.get('/', authenticateUser, getTransactions);

// Update a transaction
router.put('/:id', authenticateUser, updateTransaction);

// Delete a transaction
router.delete('/:id', authenticateUser, deleteTransaction);

module.exports = router;
