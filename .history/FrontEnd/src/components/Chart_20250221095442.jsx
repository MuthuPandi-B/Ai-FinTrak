import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#00C49F", "#FF8042"];

const Chart = () => {
  const transactions = useSelector((state) => state.transaction.transactions);

  const income = transactions.filter((t) => t.type === "income").length;
  const expense = transactions.filter((t) => t.type === "expense").length;

  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Transaction Breakdown</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default Chart;
