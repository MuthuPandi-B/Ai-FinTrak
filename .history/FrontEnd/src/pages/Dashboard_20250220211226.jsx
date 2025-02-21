import React, { useState } from 'react';
import ExpensePieChart from '../components/ExpensePieChart';
import SpendingLineChart from '../components/SpendingLineChart';
import TransactionFilter from '../components/TransactionFilter';

const Dashboard = ({ transactions }) => {
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  return (
    <div className="dashboard">
      <h1 className="text-2xl font-bold">Welcome to Your Finance Tracker</h1>
      <TransactionFilter
        transactions={transactions}
        onFilter={(filtered) => setFilteredTransactions(filtered)}
      />
      <ExpensePieChart transactions={filteredTransactions} />
      <SpendingLineChart transactions={filteredTransactions} />
    </div>
  );
};

export default Dashboard;
