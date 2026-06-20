import { useState } from "react";

import api from "../api";

function ExpenseForm() {

  const [title, setTitle] = useState("");

  const [amount, setAmount] = useState("");

  async function addExpense() {

    if (!title || !amount) {

      alert("Please fill all fields");

      return;
    }

    try {

      await api.post("/expenses", {
        title,
        amount,
      });

      setTitle("");

      setAmount("");

      alert("Expense Added");

      window.location.reload();

    } catch (error) {

      console.log(error);
    }
  }

  return (

    <div>

      <h2>Add Expense</h2>

      <input
        type="text"
        placeholder="Expense Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={addExpense}>
        Add Expense
      </button>

    </div>
  );
}

export default ExpenseForm;