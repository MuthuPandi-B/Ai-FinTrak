import { Pie } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  // Sample data for the charts
  const expenseData = {
    labels: ['Food & Drinks', 'Transport', 'Shopping', 'Bills'],
    datasets: [
      {
        label: 'Expenses by Category',
        data: [400, 300, 200, 150],
        backgroundColor: ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'],
      },
    ],
  };

  const spendingTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Spending Trends Over Time',
        data: [300, 400, 350, 500, 450],
        borderColor: '#82ca9d',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="shadow-lg p-4 rounded-2xl bg-white">
          <h2 className="text-lg font-semibold mb-2">Expenses by Category</h2>
          <Pie data={expenseData} />
        </div>

        {/* Line Chart */}
        <div className="shadow-lg p-4 rounded-2xl bg-white">
          <h2 className="text-lg font-semibold mb-2">Spending Trends Over Time</h2>
          <Line data={spendingTrendsData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
