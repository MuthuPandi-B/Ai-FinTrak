import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import API from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import {setTransactions, deleteTransaction,setSelectedTransaction } from "../../redux/transactionSlice";

const TransactionList = () => {
  // const [transactions, setTransactions] = useState([]);
  
  const dispatch = useDispatch();
  const transactions =useSelector((state)=>state.transactions.transactions);
  const navigate = useNavigate();
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
    const handleEdit =(transaction)=>{
      console.log("Editing Transaction:",transaction);
      dispatch()
    }
  

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
            className="p-2 rounded-lg border-b border-gray-600 flex justify-between items-center"
          >
            <span className="font-bold">{transaction.description} - $
            {transaction.amount} ({transaction.type})
            </span>
            <div className="space-x-2">
              <button className="bg-yellow-500 text-black px-2 py-1 rounded hover:bg-yellow-400"
              onClick={()=>{
                console.log("Editing Transaction:",transaction)
                dispatch(setSelectedTransaction(transaction))
              }} //Dispatch to Redux
              >
                Edit
              </button>
              <button 
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400"
              onClick={()=>handleDelete(transaction._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      )}
      
    </div>
  );
};

export default TransactionList;
