// import React from "react";
// import { useSelector } from "react-redux";
// import { PieChart, Pie, Tooltip, Cell } from "recharts";

// const COLORS = ["#00C49F", "#FF8042"];

// const Chart = () => {
//   const transactions = useSelector((state) => state.transactions?.transactions || []);

//   console.log("Transactions:", transactions);

//   if (!Array.isArray(transactions) || transactions.length === 0) {
//     return <p className="text-center text-gray-600">No transactions to display.</p>;
//   }

//   const income = transactions.filter((t) => t.type === "income").length;
//   const expense = transactions.filter((t) => t.type === "expense").length;

//   console.log("Income:", income, "Expense:", expense);

//   const data = [
//     { name: "Income", value: income },
//     { name: "Expense", value: expense },
//   ];

//   return (
//     <div className="p-4 bg-gray-100 rounded-lg">
//       <h2 className="text-xl font-bold mb-4">Transaction Breakdown</h2>
//       <PieChart width={300} height={300}>
//         <Pie
//           data={data}
//           dataKey="value"
//           nameKey="name"
//           cx="50%"
//           cy="50%"
//           outerRadius={80}
//           fill="#8884d8"
//           label
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//       </PieChart>
//     </div>
//   );
// };

// export default Chart;
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";
import dayjs from "dayjs";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB"];

const ChartPage = () => {
  const transactions = useSelector((state) => state.transactions?.transactions || []);
  
  // Get last month's expenses category-wise
  const lastMonthExpenses = useMemo(() => {
    const lastMonth = dayjs().subtract(1, "month").format("YYYY-MM");
    
    const expenses = transactions
      .filter(txn => txn.type.toLowerCase() === "expense" && dayjs(txn.date).format("YYYY-MM") === lastMonth)
      .reduce((acc, txn) => {
        acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
        return acc;
      }, {});

    return Object.keys(expenses).map(category => ({ name: category, value: expenses[category] }));
  }, [transactions]);

  // Get last 3 months income vs expense
  const incomeExpenseData = useMemo(() => {
    const currentMonth = dayjs().format("YYYY-MM");
    const lastThreeMonths = [
      dayjs().subtract(2, "month").format("YYYY-MM"),
      dayjs().subtract(1, "month").format("YYYY-MM"),
      currentMonth
    ];
    
    return lastThreeMonths.map(month => {
      const income = transactions
        .filter(txn => txn.type.toLowerCase() === "income" && dayjs(txn.date).format("YYYY-MM") === month)
        .reduce((sum, txn) => sum + txn.amount, 0);
      
      const expense = transactions
        .filter(txn => txn.type.toLowerCase() === "expense" && dayjs(txn.date).format("YYYY-MM") === month)
        .reduce((sum, txn) => sum + txn.amount, 0);
      
      return { month, income, expense };
    });
  }, [transactions]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center space-y-8">
      <h1 className="text-2xl font-bold">Financial Overview</h1>
      
      {/* Pie Chart: Last Month Category-wise Expenses */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-center">Category-wise Expenses (Last Month)</h2>
        {lastMonthExpenses.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={lastMonthExpenses} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {lastMonthExpenses.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-600">No expenses last month.</p>
        )}
      </div>
      
      {/* Bar Chart: Last 3 Months Income vs Expense */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-center">Income vs Expense (Last 3 Months)</h2>
        {incomeExpenseData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incomeExpenseData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#00C49F" name="Income" />
              <Bar dataKey="expense" fill="#FF8042" name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-600">No data for the last 3 months.</p>
        )}
      </div>
    </div>
  );
};

export default ChartPage;
