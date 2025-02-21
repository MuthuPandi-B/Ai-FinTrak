import React from 'react';
import { Pie } from 'react-chartjs-2';

const ExpensePieChart = ({ transactions }) => {
  const categories = transactions.map((tx) => tx.category);
  const uniqueCategories = [...new Set(categories)];
  const categoryAmounts = uniqueCategories.map(
    (cat) => transactions.filter((tx) => tx.category === cat).reduce((acc, tx) => acc + tx.amount, 0)
  );

  const chartData = {
    labels: uniqueCategories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: categoryAmounts,
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#8e44ad', '#2ecc71'],
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Expenses by Category</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default ExpensePieChart;
