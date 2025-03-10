

import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";
import dayjs from "dayjs";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB"];

const ChartPage = () => {
  const transactions = useSelector((state) => state.transactions?.transactions || []);

  // Get last month's expenses category-wise
  const lastMonthExpenses = useMemo(() => {
    const lastMonth = dayjs().subtract(1, "month").format("MMMM YYYY");
    const lastMonthKey = dayjs().subtract(1, "month").format("YYYY-MM");

    const expenses = transactions
      .filter((txn) => txn.type.toLowerCase() === "expense" && dayjs(txn.date).format("YYYY-MM") === lastMonthKey)
      .reduce((acc, txn) => {
        acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
        return acc;
      }, {});

    return { month: lastMonth, data: Object.keys(expenses).map((category) => ({ name: category, value: expenses[category] })) };
  }, [transactions]);

  // Get last 3 months income vs expense
  const incomeExpenseData = useMemo(() => {
    const currentMonth = dayjs().format("YYYY-MM");
    const lastThreeMonths = [
      dayjs().subtract(2, "month").format("YYYY-MM"),
      dayjs().subtract(1, "month").format("YYYY-MM"),
      currentMonth,
    ];

    return lastThreeMonths.map((month) => {
      const income = transactions
        .filter((txn) => txn.type.toLowerCase() === "income" && dayjs(txn.date).format("YYYY-MM") === month)
        .reduce((sum, txn) => sum + txn.amount, 0);

      const expense = transactions
        .filter((txn) => txn.type.toLowerCase() === "expense" && dayjs(txn.date).format("YYYY-MM") === month)
        .reduce((sum, txn) => sum + txn.amount, 0);

      return { month, income, expense };
    });
  }, [transactions]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Financial Overview</h1>
      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
        {/* Pie Chart: Last Month Category-wise Expenses */}
        <div className="w-full lg:w-1/2 p-6 rounded-lg shadow-lg bg-transparent">
          <h2 className="text-lg font-bold text-center mb-4">Category-wise Expenses ({lastMonthExpenses.month})</h2>
          {lastMonthExpenses.data.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={lastMonthExpenses.data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  fill="#8884d8"
                  label
                >
                  {lastMonthExpenses.data.map((entry, index) => (
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
        <div className="w-full lg:w-1/2 p-6 rounded-lg shadow-lg bg-transparent">
          <h2 className="text-lg font-bold text-center mb-4">Income vs Expense (Last 3 Months)</h2>
          {incomeExpenseData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={incomeExpenseData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#00C49F" name="Income" barSize={40} />
                <Bar dataKey="expense" fill="#FF8042" name="Expense" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-600">No data for the last 3 months.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartPage;