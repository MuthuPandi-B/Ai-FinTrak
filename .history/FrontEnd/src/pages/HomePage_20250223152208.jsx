import React from "react";
import Login from "../features/auth/Login";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";


const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
  if (user) {
     

  }else{

  }

};

export default HomePage;
