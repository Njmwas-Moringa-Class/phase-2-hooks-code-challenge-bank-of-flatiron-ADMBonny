import React, { useState } from "react";

function AddTransactionForm({ addTransaction }) {
  const [transactionData, setTransactionData] = useState({
    date: "",
    description: "",
    category: "",
    amount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (
      transactionData.date &&
      transactionData.description &&
      transactionData.category &&
      transactionData.amount
    ) {
      
      addTransaction(transactionData);

      
      setTransactionData({
        date: "",
        description: "",
        category: "",
        amount: 0,
      });
    }
  };

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input
            type="date"
            name="date"
            value={transactionData.date}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={transactionData.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={transactionData.category}
            onChange={handleChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            step="0.01"
            value={transactionData.amount}
            onChange={handleChange}
          />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm; 