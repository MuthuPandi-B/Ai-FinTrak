import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useState } from "react";

const Dashboard = () => {
  // Sample data for the charts
  const expenseData = [
    { name: "Food & Drinks", value: 400 },
    { name: "Transport", value: 300 },
    { name: "Shopping", value: 200 },
    { name: "Bills", value: 150 },
  ];

  const spendingTrends = [
    { month: "Jan", expenses: 300 },
    { month: "Feb", expenses: 400 },
    { month: "Mar", expenses: 350 },
    { month: "Apr", expenses: 500 },
    { month: "May", expenses: 450 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card className="shadow-lg p-4 rounded-2xl">
          <h2 className="text-lg font-semibold mb-2">Expenses by Category</h2>
          <PieChart width={300} height={300}>
            <Pie
              data={expenseData}
              cx={150}
              cy={150}
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </Card>

        {/* Line Chart */}
        <Card className="shadow-lg p-4 rounded-2xl">
          <h2 className="text-lg font-semibold mb-2">Spending Trends Over Time</h2>
          <LineChart width={400} height={300} data={spendingTrends}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="expenses" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
