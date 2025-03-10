import Transaction from "../models/Transaction.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const addTransaction = async (req, res) => {
  try {
    const { amount, type, description,date } = req.body;
    // console.log("Incoming transaction data:", req.body);

    const apiKey = process.env.AI_API_KEY;
    let category="Uncategorized";

    if (!apiKey) {
      // console.log("Error: API key is not defined.");
      return res
        .status(500)
        .json({ message: "Server configuration error: Missing API key" });
    }else{
      try{
        

    // Prepare the prompt for categorization
    const promptText = `Categorize this word in one word like in which category it belongs like food and drinks ,Travel,Medicine,...: '${description}'`;
   
    const API_KEY = process.env.API_KEY;
const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`

    // const apiUrl =
    //   "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english";

    // console.log("Prompt to AI Service:", promptText);

    await new Promise((resolve) => setTimeout(resolve, 5000)); // Optional delay for testing

    // Send request to Hugging Face API
    // const response = await axios.post(
    //   apiUrl,
    //   { inputs: promptText }, // Use `promptText` instead of `inputText`
    //   {
    //     headers: {
    //       Authorization: `Bearer ${apiKey}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    const apiResponse = await axios.post(apiUrl, 
      {
        contents: [
          {
            role: "user",
            parts: [{ text: promptText }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    // console.log("Full API Response:", JSON.stringify(apiResponse.data, null, 2)); // Log full response

    // const response = apiResponse?.candidates[0].content.parts[0].text.replace(
    //   /\*\*(.*?)\*\*/g,
    //   "$1"
    // );
    // console.log(response);

    // if (response.data && response.data.length > 0) {
    //   const category =
    //     response.data[0]?.generated_text?.trim() || "Uncategorized"; // Extract category
    //   console.log("Category received from AI:", category);
     category =
  apiResponse?.data?.candidates?.[0]?.content?.parts?.map(part => part.text).join(" ").trim() || "Uncategorized";

// console.log("Extracted Category:", category);
      }
      catch (apiError) {
        console.error("AI API request failed:", apiError.message);
      }
    }

  

      // Create new transaction
      const newTransaction = new Transaction({
        user: req.user.id,
        amount,
        type,
        description,
        category,
        date:date ? new Date(date) : new Date(),
      });

      // Save the transaction to the database
      const savedTransaction = await newTransaction.save();
      console.log("Transaction successfully saved:", savedTransaction);
      res.status(201).json(savedTransaction);
    // } else {
    //   throw new Error("No valid response from AI service.");
    // }
  } catch (error) {
    console.error("Error adding transaction:", error);
    res
      .status(500)
      .json({ message: "Error adding transaction", error: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await Transaction.find({ user: userId });
    res.status(200).json(transactions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching transactions", error: error.message });
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
    res
      .status(500)
      .json({ message: "Error updating transaction", error: error.message });
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
    res
      .status(500)
      .json({ message: "Error deleting transaction", error: error.message });
  }
};
