import React, { useState } from "react";
import "./search.css";
import "../../../public/img/search.svg";

const Search = ({ searchSubstring }) => {
  let [string, setString] = useState("");
  function handler(e) {
    e.preventDefault();
    searchSubstring(string);
  }
  return (
    <div className="search__main">
      <form className="search-input-form" onSubmit={(e) => handler(e)}>
        <input
          className="search-input"
          placeholder="Поиск"
          name="q"
          value={string}
          onChange={(e) => setString(e.target.value)}
        />
        <input className="search-input-btn" type="submit" value="Найти" />
      </form>
    </div>
  );
};

export default Search;
