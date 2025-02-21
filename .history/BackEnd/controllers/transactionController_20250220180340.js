import Transaction from '../models/Transaction.js';
import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

export const addTransaction = async (req, res) => {
 

  try {
    const { amount, type, description } = req.body;
    console.log("Incoming transation data:",req.body);
    const apiKey=process.env.OPENAI_API_KEY;
    if(!apiKey){
        console.log("Error: OPENAI_API_KEY is not defined in environment variables");
        return res.status(500).json({message: "Server configuration error: Missing API key" })
    }
    console.log("Using API Key:", apiKey.substring(0, 5) + "*****");
        // Prepare the OpenAI request
        const promptText = `Categorize the following transaction: '${description}'`;
        const apiUrl = "https://api.openai.com/v1/chat/completions";

        console.log("Prompt to OpenAI:", promptText);

        await
    // Send description to AI-powered service for categorization
    const response = await axios.post(
        apiUrl,
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", 
            content: promptText
           }],
          max_tokens: 10,
        
        },
        {
          headers: {
            "Authorization": `Bearer ${apiKey}`, // Ensure correct format
            "Content-Type": "application/json",
          },
        }
      );
    console.log(response.data)
    const category = response.data.choices[0].text.trim();

    const newTransaction = new Transaction({
      user: req.user.id,
      amount,
      type,
      description,
      category,
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Error adding transaction' ,error:error.message});
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};

export const updateTransaction = async (req, res) => {
  const { amount, type, description } = req.body;
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { amount, type, description },
      { new: true }
    );

    if (!updatedTransaction) return res.status(404).json({ message: 'Transaction not found' });

    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Error updating transaction' });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) return res.status(404).json({ message: 'Transaction not found' });

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction' });
  }
};
