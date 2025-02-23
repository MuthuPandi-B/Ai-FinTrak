import React from "react";
import Login from "../features/auth/Login";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import Dashboard from "../components/Dashboard"
import chart from "../"


const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
  if (user) {
    Dashboard
     

  }else{ // Sample data for Pie Chart
    const pieData = [
      { name: "Savings", value: 40 },
      { name: "Expenses", value: 30 },
      { name: "Investments", value: 20 },
      { name: "Debt", value: 10 },
    ];
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  
    // Sample data for Line Chart
    const lineData = [
      { month: "Jan", balance: 3000 },
      { month: "Feb", balance: 3500 },
      { month: "Mar", balance: 4000 },
      { month: "Apr", balance: 3800 },
      { month: "May", balance: 4200 },
    ];
  
    return (
      <div className="flex flex-col lg:flex-row h-screen p-6 bg-gray-50">
        {/* Left Side Dashboard Section */}
        <div className="lg:w-1/4 w-full bg-white p-6 rounded-lg shadow-md mb-6 lg:mb-0">
          <h2 className="text-xl font-bold mb-4">Dashboard Preview</h2>
          <ul className="list-disc pl-4 text-gray-700">
            <li className="mb-2">View transaction history</li>
            <li className="mb-2">Track spending patterns</li>
            <li className="mb-2">Set financial goals</li>
            <li>Analyze monthly savings</li>
          </ul>
        </div>
  
        {/* Center Section with Charts */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 mx-0 lg:mx-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Welcome to FinTrack</h1>
          <p className="text-center mb-6 text-gray-600">
            FinTrack helps you take control of your finances by providing a clear overview of your income, expenses, and savings. 
            Start tracking your financial health today!
          </p>
  
          {/* Pie Chart */}
          <div className="w-full max-w-md">
            <h3 className="text-lg font-bold text-center">Expense Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
  
          {/* Line Chart */}
          <div className="w-full max-w-md overflow-hidden">
            <h3 className="text-lg font-bold text-center">Monthly Balance Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="balance" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
  
        {/* Right Side Login Section */}
        <div className="lg:w-1/4 w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center lg:text-left">Login</h2>
          <Login />
        </div>
      </div>
    );

  }

};

export default HomePage;
