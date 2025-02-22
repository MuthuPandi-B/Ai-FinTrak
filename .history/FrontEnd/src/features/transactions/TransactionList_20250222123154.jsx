// import React, { useEffect, useState } from "react";
// import { useDispatch,useSelector } from "react-redux";
// import API from "../../Api/Api";
// import { useNavigate } from "react-router-dom";
// import {setTransactions, deleteTransaction,setSelectedTransaction } from "../../redux/transactionSlice";

// const TransactionList = () => {
//   // const [transactions, setTransactions] = useState([]);
  
//   const dispatch = useDispatch();
//   const transactions =useSelector((state)=>state.transactions.transactions);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await API.get("/transactions", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in headers
//           },
//         });
//         dispatch(setTransactions(response.data));
//       } catch (error) {
//         console.error("Error fetching transactions", error);
//       }
//     };

//     fetchTransactions();
//   }, [dispatch]);
//   const handleDelete =async(transactionId)=>{
//     if(window.confirm("Are you sure want to delete this transaction?")){
//       try{
//         await API.delete(`/transactions/${transactionId}`,{
//           headers:{
//           Authorization:`Bearer ${localStorage.getItem("token")}`,

//           },
//         });
//         dispatch(deleteTransaction(transactionId));
//         alert("Transaction deleted Successfully");
      
//       }catch(error){
//         console.error("Error deleting transaction",error);
//       }
//     }
//   };
//     const handleEdit =(transaction)=>{
//       console.log("Editing Transaction:",transaction);
//       dispatch(setSelectedTransaction(transaction))
//       navigate("/add")
//     }
  

//   return (
//     <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Transaction List</h2>
//       {transactions.length === 0 ?(
//         <p className="text-gray-400">No transactions found.</p>
//       ):(
//         <ul className="space-y-2">
//         {transactions.map((transaction) => (
//           <li
//             key={transaction._id}
//             className="p-2 rounded-lg border-b border-gray-600 flex justify-between items-center"
//           >
//             <span className="font-bold">{transaction.description} - $
//             {transaction.amount} ({transaction.type})
//             </span>
//             <div className="space-x-2">
//               <button className="bg-yellow-500 text-black px-2 py-1 rounded hover:bg-yellow-400"
//               onClick={()=>{
//                 console.log("Editing Transaction:",transaction)
//                handleEdit(transaction)
//               }} //Dispatch to Redux
//               >
//                 Edit
//               </button>
//               <button 
//               className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400"
//               onClick={()=>handleDelete(transaction._id)}>
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       )}
      
//     </div>
//   );
// };

// export default TransactionList;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import { setTransactions, deleteTransaction, setSelectedTransaction } from "../../redux/transactionSlice";

const TransactionList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions.transactions);
  const navigate = useNavigate();
  const[categoryFilter,setCategoryFilter]=useState("");

  const [filters, setFilters] = useState({
    date: "",
    type: "",
    category: "",
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await API.get("/transactions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        dispatch(setTransactions(response.data));
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };

    fetchTransactions();
  }, [dispatch]);

  const handleDelete = async (transactionId) => {
    if (window.confirm("Are you sure want to delete this transaction?")) {
      try {
        await API.delete(`/transactions/${transactionId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        dispatch(deleteTransaction(transactionId));
        alert("Transaction deleted Successfully");
      } catch (error) {
        console.error("Error deleting transaction", error);
      }
    }
  };

  const handleEdit = (transaction) => {
    dispatch(setSelectedTransaction(transaction));
    navigate("/add");
  };

  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Filter transactions based on user input
  const filteredTransactions = sortedTransactions.filter((transaction) => {
    return (
      (!filters.date || transaction.date.startsWith(filters.date)) &&
      (!filters.type || transaction.type === filters.type) &&
      (!filters.category || transaction.category.toLowerC=== filters.category)
    );
  });

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Transaction List</h2>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="date"
          className="p-2 text-black rounded"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
        <select
          className="p-2 text-black rounded"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="text"
          placeholder="Filter by Category"
          className="p-2 text-black rounded"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />
      </div>

      {/* Transactions List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-400">No transactions found.</p>
        ) : (
          <ul className="space-y-2">
            {filteredTransactions.map((transaction) => (
              <li
                key={transaction._id}
                className="p-2 rounded-lg border-b border-gray-600 flex justify-between items-center"
              >
                <div>
                  <span className="font-bold">
                    {transaction.description} - ${transaction.amount} ({transaction.type})
                  </span>
                  <p className="text-gray-400 text-sm">
                    {new Date(transaction.date).toLocaleDateString()} | {transaction.category}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    className="bg-yellow-500 text-black px-2 py-1 rounded hover:bg-yellow-400"
                    onClick={() => handleEdit(transaction)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400"
                    onClick={() => handleDelete(transaction._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
