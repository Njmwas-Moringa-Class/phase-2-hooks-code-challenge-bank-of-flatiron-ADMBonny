import React from "react";

function Transaction({ transaction, onDelete }) {
  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td>{transaction.amount}</td>
      <td>
        <button onClick={() => onDelete(transaction.id)} className="ui button red">
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Transaction;
