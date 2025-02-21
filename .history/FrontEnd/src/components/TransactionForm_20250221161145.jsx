import React, { useEffect, useState } from "react";
import { addTransaction,updateTransaction,setSelectedTransaction} from "../redux/transactionSlice.js";
import { useDispatch, useSelector } from "react-redux";
import API from "../Api/Api.js";

const Transaction = () => {
  const selectedTransaction =useSelector((state)=>state.tra)
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    //Prefill form if editing
    if (selectedTransaction) {
      setAmount(selectedTransaction.amount);
      setType(selectedTransaction.type);
      setDescription(selectedTransaction.description);
    } else {
      setAmount("");
      setType("income");
      setDescription("");
    }
  },[selectedTransaction]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !description) {
      alert("Please fill all fields");
      return;
    }

    const transactionData = { amount, type, description };
    try {
      if (selectedTransaction) {
        const response = await API.put(
          `transactions/${selectedTransaction._id}`,
          transactionData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token for authentication
            },
          }
        );
        dispatch(updateTransaction(response.date));
        alert("Transaction updated successfully");
      } else {
        const response = await API.post("/transactions/add", transactionData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token for authentication
          },
        });
        dispatch(addTransaction(response.data)); //add new transaction to redux state
        alert("Transaction added successfully");
      }

      // Reset form
      setAmount("");
      setType("income");
      setDescription("");
      onClearEdit();// Clear the form after edit
    } catch (error) {
      alert("Error adding transaction");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-lg bg-gray-800 text-white">
      <h2 className="text-xl font-bold mb-4">{selectedTransaction ? "Edit Transaction":"Add Transaction"}</h2>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium">
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 rounded border"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium">
          Type:
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 rounded border bg-gray-900 text-white"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">
          Description:
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded border bg-gray-900 text-white"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-500"
      >
        {selectedTransaction?"Update Transaction":"Add Transaction"}
      </button>
    </form>
  );
};

export default Transaction;
