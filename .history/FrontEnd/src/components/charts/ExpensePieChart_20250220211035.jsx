import React from 'react';
import { Pie } from 'react-chartjs-2';

const ExpensePieChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: 'Expenses by Category',
        data: data.map((item) => item.amount),
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#8e44ad', '#2ecc71'],
      },
    ],
  };

  return (
    <div>
      <h2>Expenses by Category</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default ExpensePieChart;
