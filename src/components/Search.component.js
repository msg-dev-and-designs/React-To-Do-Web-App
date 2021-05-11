import React, { useState } from "react";
import axios from "axios";

const Search = (props) => {
  const [search, setSearch] = useState("");

  //SerachHandler get the todos from the db and will filter them using the search information given.
  //Which will then ultimatly be displayed
  const SearchHandler = () => {
    axios
      .get("http://localhost:5000/todos/todos")
      .then((res) =>
        props.setTodos(res.data.filter((data) => data.task.includes(search)))
      );
  };

  //If the search input is blank show all the todos associated with that user
  const ChangeHandler = (e) => {
    if (e == "") {
      axios
        .get("http://localhost:5000/todos/todos")
        .then((res) => props.setTodos(res.data));
    }
  };

  return (
    <div className="search-wrapper">
      <input
        className="search-input"
        placeholder="Search a task..."
        onChange={(e) => {
          setSearch(e.target.value.toLowerCase());
          ChangeHandler(e.target.value);
        }}
      />
      <button className="search-button" onClick={SearchHandler}>
        Search
      </button>
    </div>
  );
};

export default Search;
