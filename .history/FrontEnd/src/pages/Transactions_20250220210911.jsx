import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTransactions, deleteTransaction } from '../redux/slices/transactionSlice';

const Transactions = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/transactions');
        dispatch(setTransactions(response.data));
      } catch (error) {
        alert('Error fetching transactions');
      }
    };
    fetchTransactions();
  }, [dispatch]);

  const handleEdit = (transactionId) => {
    navigate(`/edit-transaction/${transactionId}`);
  };

  const handleDelete = async (transactionId) => {
    try {
      await axios.delete(`/api/transactions/${transactionId}`);
      dispatch(deleteTransaction(transactionId));
    } catch (error) {
      alert('Error deleting transaction');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      {transactions.length > 0 ? (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Amount</th>
              <th className="border border-gray-300 p-2">Type</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td className="border border-gray-300 p-2">${transaction.amount}</td>
                <td className="border border-gray-300 p-2">{transaction.type}</td>
                <td className="border border-gray-300 p-2">{transaction.description}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEdit(transaction._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(transaction._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default Transactions;
