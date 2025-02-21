import React from 'react';
import { Line } from 'react-chartjs-2';

const SpendingLineChart = ({ transactions }) => {
  const dates = transactions.map((tx) => new Date(tx.date).toLocaleDateString());

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Spending Trends',
        data: transactions.map((tx) => tx.amount),
        borderColor: '#36a2eb',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2>Spending Trends</h2>
      <Line data={chartData} />
    </div>
  );
};

export default SpendingLineChart;
