// import Transaction from '../models/Transaction.js';
// import axios from 'axios';
// import dotenv from "dotenv";
// dotenv.config();


// export const addTransaction = async (req, res) => {
//   try {
//     const { amount, type, description } = req.body;
//     console.log("Incoming transaction data:", req.body);

//     const apiKey = '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';
//     if (!apiKey) {
//       console.log("Error: API key is not defined.");
//       return res.status(500).json({ message: "Server configuration error: Missing API key" });
//     }

//     console.log("Using API Key:", apiKey.substring(0, 5) + "*****");

//     // Prepare the prompt for categorization
//     const promptText = `Categorize the following transaction: '${description}'`;
//     // const apiUrl = 'https://api-inference.huggingface.co/models/DistilBERT';
//     const apiUrl = 'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english';

//     console.log("Prompt to AI Service:", promptText);

//     await new Promise((resolve) => setTimeout(resolve, 5000)); // Optional delay for testing

//     // Send request to Hugging Face API
//     const response = await axios.post(
//       apiUrl,
//       { inputs: promptText }, // Use `promptText` instead of `inputText`
//       {
//         headers: {
//           Authorization: `Bearer ${apiKey}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     console.log("API Response:", response.data);

//     if (response.data && response.data.length > 0) {
//       const category = response.data[0]?.generated_text?.trim() || "Uncategorized"; // Extract category
//       console.log("Category received from AI:", category);

//       // Create new transaction
//       const newTransaction = new Transaction({
//         user: req.user.id,
//         amount,
//         type,
//         description,
//         category,
//       });

//       // Save the transaction to the database
//       const savedTransaction = await newTransaction.save();
//       console.log("Transaction successfully saved:", savedTransaction);
//       res.status(201).json(savedTransaction);
//     } else {
//       throw new Error("No valid response from AI service.");
//     }
//   } catch (error) {
//     console.error("Error adding transaction:", error);
//     res.status(500).json({ message: 'Error adding transaction', error: error.message });
//   }
// };


// export const getTransactions = async (req, res) => {
//   try {
//     const transactions = await Transaction.find({ user: req.user.id });
//     res.json(transactions);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching transactions' });
//   }
// };

// export const updateTransaction = async (req, res) => {
//   const { amount, type, description } = req.body;
//   try {
//     const updatedTransaction = await Transaction.findByIdAndUpdate(
//       req.params.id,
//       { amount, type, description },
//       { new: true }
//     );

//     if (!updatedTransaction) return res.status(404).json({ message: 'Transaction not found' });

//     res.json(updatedTransaction);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating transaction' });
//   }
// };

// export const deleteTransaction = async (req, res) => {
//   try {
//     const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
//     if (!deletedTransaction) return res.status(404).json({ message: 'Transaction not found' });

//     res.json({ message: 'Transaction deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting transaction' });
//   }
// };

import Transaction from '../models/Transaction.js';
import axios from 'axios';

// Add Transaction
export const addTransaction = async (req, res) => {
  try {
    const { amount, type, description } = req.body;
    const userId = req.user.id;

    // Categorize transaction using AI
    const promptText = `Categorize the following transaction: '${description}'`;
    const apiUrl = 'https://api-inference.huggingface.co/models/gpt2';

    const response = await axios.post(
      apiUrl,
      { inputs: promptText },
      {
        headers: {
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const category = response.data.choices ? response.data.choices[0].text.trim() : 'Uncategorized';

    // Create a new transaction
    const newTransaction = new Transaction({
      user: userId,
      amount,
      type,
      description,
      category,
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Error adding transaction', error: error.message });
  }
};

// Get All Transactions for User
export const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await Transaction.find({ user: userId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
};
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, user: req.user.id },
      updatedData,
      { new: true } // Ensures the updated document is returned
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error updating transaction", error: error.message });
  }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error: error.message });
  }
};