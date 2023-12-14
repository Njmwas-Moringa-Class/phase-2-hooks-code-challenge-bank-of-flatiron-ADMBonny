import React, { useEffect, useState,  } from "react";
import Transaction from "./Transaction";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [originalTransactions, setOriginalTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortKey, setSortKey] = useState('date');

  useEffect(() => {
  

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8001/transactions");
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log("Fetched data:", data);
      setTransactions(data);
      setOriginalTransactions(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  fetchTransactions();
}, []);

  const addTransaction = async (newTransaction) => {
    try {
      const response = await fetch("http://localhost:8001/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const addedTransaction = await response.json();
      setTransactions([...transactions, addedTransaction]);
      setOriginalTransactions([...originalTransactions, addedTransaction]);
    } catch (error) {
      console.error("Error adding transaction", error);
    }
  };

  const filterTransactions = (searchParams) => {
    const filteredTransactions = originalTransactions.filter((transaction) => {
      return Object.keys(searchParams).every((key) => {
        if (!searchParams[key]) return true; // ignore empty search params
        return transaction[key].toString().toLowerCase().includes(searchParams[key].toLowerCase());
      });
    });
    setTransactions(filteredTransactions);
  };

  const sortTransactions = () => {
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return -1;
      if (a[sortKey] > b[sortKey]) return 1;
      return 0;
    });
    setTransactions(sortedTransactions);
  }; 

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`http://localhost:8001/transactions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setTransactions(transactions.filter((transaction) => transaction.id !== id));
      setOriginalTransactions(originalTransactions.filter((transaction) => transaction.id !== id));
    } catch (error) {
      console.error("Error deleting transaction", error);
    }
  };
  useEffect(() => {
    sortTransactions();
  }, [sortKey]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Search filterTransactions={filterTransactions} />
      <AddTransactionForm addTransaction={addTransaction} />
      <div>
        <button onClick={() => setSortKey('category')}>Sort by Category</button>
        <button onClick={() => setSortKey('description')}>Sort by Description</button>
      </div>
      <table className="ui celled striped padded table">
        <tbody>
          <tr>
            <th>
              <h3 className="ui center aligned header">Date</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Description</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Category</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Amount</h3>
            </th>
            <th>
              <h3 className="ui center aligned header">Actions</h3>
            </th>
          </tr>
          {transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} onDelete={deleteTransaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsList;