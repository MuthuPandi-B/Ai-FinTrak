import React, { useState } from 'react';

const TransactionFilter = ({ transactions, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleFilter = () => {
    const filtered = transactions.filter((tx) => {
      const matchesCategory = selectedCategory ? tx.category === selectedCategory : true;
      const matchesAmount =
        (minAmount ? tx.amount >= parseFloat(minAmount) : true) &&
        (maxAmount ? tx.amount <= parseFloat(maxAmount) : true);
      const matchesDate = selectedDate ? new Date(tx.date).toLocaleDateString() === selectedDate : true;
      return matchesCategory && matchesAmount && matchesDate;
    });
    onFilter(filtered);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold">Filter Transactions</h3>
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Min Amount"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Max Amount"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
          className="border p-2"
        />
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2"
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleFilter}
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default TransactionFilter;
