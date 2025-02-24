import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const Dashboard = () => {
  const transactions = useSelector((state) => state.transactions.transactions);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filterType, setFilterType] = useState("thisMonth");

  useEffect(() => {
    filterTransactions();
  }, [filterType, transactions]);

  // Function to filter transactions based on selected filter
  const filterTransactions = () => {
    const today = dayjs();
    let filteredData = [];

    if (filterType === "thisDay") {
      filteredData = transactions.filter((t) => dayjs(t.date).isSame(today, "day"));
    } else if (filterType === "thisWeek") {
      filteredData = transactions.filter((t) => dayjs(t.date).isSame(today, "week"));
    } else if (filterType === "thisMonth") {
      filteredData = transactions.filter((t) => dayjs(t.date).isSame(today, "month"));
    } else if (filterType === "thisYear") {
      filteredData = transactions.filter((t) => dayjs(t.date).isSame(today, "year"));
    }

    setFilteredTransactions(filteredData);
  };

  // Calculate total income, expense, and profit/loss
  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const profitLoss = totalIncome - totalExpense;

  // Find the category with max spending
  const categoryExpenseMap = {};
  const categoryIncomeMap = {};

  filteredTransactions.forEach((t) => {
    if (t.type === "expense") {
      categoryExpenseMap[t.category] = (categoryExpenseMap[t.category] || 0) + t.amount;
    } else if (t.type === "income") {
      categoryIncomeMap[t.category] = (categoryIncomeMap[t.category] || 0) + t.amount;
    }
  });

  const maxExpenseCategory = Object.entries(categoryExpenseMap).reduce(
    (max, entry) => (entry[1] > max[1] ? entry : max),
    ["None", 0]
  );

  const maxIncomeCategory = Object.entries(categoryIncomeMap).reduce(
    (max, entry) => (entry[1] > max[1] ? entry : max),
    ["None", 0]
  );

  return (
    <div className="bg-gray-800 text-white w-full h-full  md:w-1/4 min-w-[250px] 
     ">
 <h2 className="text-xl font-bold mb-4">Dashboard</h2>

 {/* Filter Dropdown */}
 <select
   className="p-2 w-full text-black rounded"
   value={filterType}
   onChange={(e) => setFilterType(e.target.value)}
 >
   <option value="thisDay">This Day</option>
   <option value="thisWeek">This Week</option>
   <option value="thisMonth">This Month</option>
   <option value="thisYear">This Year</option>
 </select>

 <div className="mt-4">
   <h3 className="text-lg font-semibold">Financial Summary</h3>
   <p>Total Income: <span className="text-green-400">${totalIncome.toFixed(2)}</span></p>
   <p>Total Expense: <span className="text-red-400">${totalExpense.toFixed(2)}</span></p>
   <p>
     Profit/Loss: 
     <span className={profitLoss >= 0 ? "text-green-400" : "text-red-400"}>
       ${profitLoss.toFixed(2)}
     </span>
   </p>
 </div>

 {/* Category Analytics */}
 <div className="mt-4">
   <h3 className="text-lg font-semibold">Category Analytics</h3>
   <p>Max Spend: {maxExpenseCategory[0]} - ${maxExpenseCategory[1]}</p>
   <p>Max Income: {maxIncomeCategory[0]} - ${maxIncomeCategory[1]}</p>
 </div>
 <div>
   <h3 className="text-lg font-semibold">Last 10 Transactions</h3>
   <ul>
     {filteredTransactions.slice(-10).map((t, index) => (
       <li key={index} className="mb-2">
         <span className="font-semibold"></span> {t.description} - ${t.amount.toFixed(2)}
       </li>
     ))}
   </ul>
 </div>
</div>


  );
};

export default Dashboard;
