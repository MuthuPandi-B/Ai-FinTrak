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
  const handleDelete =async(transactionId)=>{
    if(window.confirm("Are you sure want to delete this transaction?")){
      try{
        await API.delete(`/transactions/${transactionId}`,{
          headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,

          },
        });
        dispatch(deleteTransaction(transactionId));
        alert("Transaction deleted Successfully");
      
      }catch(error){
        console.error("Error deleting transaction",error);
      }
    }
  };
    
  

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Transaction List</h2>
      {transactions.length === 0 ?(
        <p className="text-gray-400">No transactions found.</p>
      ):(
        <ul className="space-y-2">
        {transactions.map((transaction) => (
          <li
            key={transaction._id}
            className="p-2 rounded-lg border-b border-gray-600 flex justify-between ityem"
          >
            <span className="font-bold">{transaction.description}</span> - $
            {transaction.amount} ({transaction.type})
          </li>
        ))}
      </ul>
      )}
      
    </div>
  );
};

export default TransactionList;
