import React, { useState } from 'react';

const TransactionForm = () => {
  const [form, setForm] = useState({ amount: '', type: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // Add your form submission logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
      <input name="type" placeholder="Type" value={form.type} onChange={handleChange} />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
