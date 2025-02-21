import React from 'react';
import ExpensePieChart from './ExpensePieChart';
import SpendingLineChart from './SpendingLineChart';

const Dashboard = ({ transactions }) => {
  return (
    <div className="dashboard">
      <h1>Welcome to Your Finance Tracker</h1>
      <ExpensePieChart data={transactions} />
      <SpendingLineChart transactions={transactions} />
    </div>
  );
};

export default Dashboard;
