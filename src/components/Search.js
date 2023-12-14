import React, { useState } from "react";

function Search({ filterTransactions }) {
  const [searchParams, setSearchParams] = useState({
    description: "",
    category: "",
    date: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      [name]: value,
    }));

    filterTransactions({
      ...searchParams,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    filterTransactions(searchParams);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="ui large fluid icon input">
        <input
          type="text"
          name="description"
          placeholder="Search by Description"
          value={searchParams.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Search by Category"
          value={searchParams.category}
          onChange={handleChange}
        />
        <input
          type="text"
          name="date"
          placeholder="Search by Date"
          value={searchParams.date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="amount"
          placeholder="Search by Amount"
          value={searchParams.amount}
          onChange={handleChange}
        />
        <button type="submit" className="circular search link icon">
          <i className="search icon"></i>
        </button>
      </div>
    </form>
  );
}

export default Search;