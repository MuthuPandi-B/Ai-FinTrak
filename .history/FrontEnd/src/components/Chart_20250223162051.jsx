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

import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";
import { useMemo } from "react";

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CF7", "#FF6384"];

const ChartPage = () => {
  const transactions = useSelector((state) => state.transactions?.data || []);


  const currentDate = dayjs();
  const lastMonth = currentDate.subtract(1, "month").format("YYYY-MM");
  console.log("All Transaction",transactions)
  const threeMonthsAgo = currentDate.subtract(3, "month").format("YYYY-MM");

  // Filter last month's expenses for Pie Chart
  const lastMonthExpenses = transactions
    .filter(txn => txn.type.toLowerCase() === "expense" && dayjs(txn.date).format("YYYY-MM") === lastMonth)
    .reduce((acc, txn) => {
      acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
      return acc;
    }, {});


  const pieData = Object.keys(lastMonthExpenses).map(category => ({
    name: category,
    value: lastMonthExpenses[category],
  }));

  // Group last 3 months' income & expenses for Bar Chart
  const groupedData = transactions.reduce((acc, txn) => {
    const txnMonth = dayjs(txn.date).format("YYYY-MM");
    console.log("Transaction Date:",txn.date,"Parsed MOnth:",txnMonth,"Expected Last Month:",lastMonth);
    if (txnMonth >= threeMonthsAgo) {
      if (!acc[txnMonth]) acc[txnMonth] = { month: txnMonth, income: 0, expense: 0 };
      acc[txnMonth][txn.type] += txn.amount;
    }
 
    return acc;
  }, {});

  const barData = Object.values(groupedData).sort((a, b) => a.month.localeCompare(b.month));

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Financial Insights</h1>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Category-wise Expenses (Last Month)</h2>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">No expenses recorded last month.</p>
          )}
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Income vs Expense (Last 3 Months)</h2>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" fill="#00C49F" name="Income" />
                <Bar dataKey="expense" fill="#FF8042" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">No data available for last 3 months.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
