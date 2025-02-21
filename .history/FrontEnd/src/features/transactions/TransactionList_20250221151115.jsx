import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import API from "../../Api/Api";
import {setTransactions, deleteTransaction } from "../../redux/transactionSlice";

const TransactionList = ({onEdit}) => {
  // const [transactions, setTransactions] = useState([]);
  const transaction =useSelector((state)=>state.transactions.transactions);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await API.get("/transactions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in headers
          },
        });
        dispatch(setTransactions(response.data));
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };

    fetchTransactions();
  }, [dispatch]);
  const handleDelete =async(=>{
    
  })

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Transaction List</h2>
      <ul className="space-y-2">
        {transactions.map((transaction) => (
          <li
            key={transaction._id}
            className="p-2 rounded-lg border-b border-gray-200"
          >
            <span className="font-bold">{transaction.description}</span> - $
            {transaction.amount} ({transaction.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
