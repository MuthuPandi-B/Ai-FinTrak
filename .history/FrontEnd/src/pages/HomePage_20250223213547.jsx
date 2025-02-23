import React, { useEffect } from "react";
import Login from "../features/auth/Login";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import Dashboard from "../components/Dashboard";
import Chart from "../components/Chart";// Ensure correct import
import { setTransactions } from '../redux/transactionSlice';
import { useDispatch } from "react-redux";
import API from "../Api/Api";



const HomePage = () => {
  const dispatch =useDispatch();
  const user = useSelector((state) => state.auth.user);

  if(user){
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

  }


  // Sample data for Pie Chart
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
    <div className="flex flex-col lg:flex-row  p-6">
      {/* Left Side - Dashboard if logged in, otherwise Dashboard Preview */}
      <div className="lg:w-1/4 w-full  p-6 rounded-lg shadow-md mb-6 lg:mb-0">
      {user && (
        <button 
          className="sm:block lg:hidden bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>
      )}

      {/* Left Side - Dashboard (Hidden in Mobile, Visible in Large Screens) */}
      <div className="hidden lg:block lg:w-1/4 w-full p-6 rounded-lg shadow-md mb-6 lg:mb-0">
        {user ? (
          <Dashboard />
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Dashboard Preview</h2>
            <ul className="list-disc pl-4 text-gray-700">
              <li className="mb-2">View transaction history</li>
              <li className="mb-2">Track spending patterns</li>
              <li className="mb-2">Set financial goals</li>
              <li>Analyze monthly savings</li>
            </ul>
          </>
        )}
      </div>

      {/* Center Section - Charts */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 mx-0 lg:mx-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome to FinTrack</h1>
        <p className="text-center mb-6 text-gray-600">
          FinTrack helps you take control of your finances by providing a clear overview of your income, expenses, and savings.
          Start tracking your financial health today!
        </p>

        {/* If logged in, show financial chart (Replace with your actual Chart component) */}
        {user ? (
          <Chart />
        ) : (
          <>
            {/* Pie Chart */}
            <div className="w-full max-w-md">
              <h3 className="text-lg font-bold text-center">Expense Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
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
          </>
        )}
      </div>

      {/* Right Side - Show login if not logged in */}
      {!user && (
        <div className="lg:w-1/4 w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-center lg:text-left">Login</h2>
          <Login />
        </div>
      )}
    </div>
  );
};

export default HomePage;


// import React, { useState } from "react";
// import Login from "../features/auth/Login";
// import { useSelector } from "react-redux";
// import Dashboard from "../components/Dashboard";
// import ChartPage from "../components/Chart";

// const HomePage = () => {
//   const user = useSelector((state) => state.auth.user);
//   const [showDashboard, setShowDashboard] = useState(false);

//   return (
//     <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
//       {/* Left Side - Dashboard */}
//       {user && (
//         <div
//           className={`lg:w-1/4 w-ful  rounded-lg shadow-md fixed top-0 left-0 h-full transform transition-transform duration-300 ${
//             showDashboard ? "translate-x-0" : "-translate-x-full"
//           } lg:translate-x-0 z-10`}
//           onMouseEnter={() => setShowDashboard(true)}
//           onMouseLeave={() => setShowDashboard(false)}
//         >
//           <Dashboard />
//         </div>
//       )}

//       {/* Center Section - Charts */}
//       <div className={`flex-1 ${user ? "lg:ml-[25%]" : ""} mt-16 lg:mt-0`}>
//         {user ? (
//           <ChartPage />
//         ) : (
//           <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
//             <Login />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;