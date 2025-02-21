import Transaction from '../models/Transaction.js';

export const getInsights = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });

    const totalIncome = transactions
      .filter((t) => t.type === 'Income')
      .reduce((acc, t) => acc + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === 'Expense')
      .reduce((acc, t) => acc + t.amount, 0);

    const netSavings = totalIncome - totalExpenses;

    const categoryBreakdown = transactions.reduce((acc, t) => {
      if (t.type === 'Expense') {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
      }
      return acc;
    }, {});

    res.json({ totalIncome, totalExpenses, netSavings, categoryBreakdown });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching insights' });
  }
};
