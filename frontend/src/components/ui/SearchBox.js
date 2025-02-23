import { useState } from "react";
import classes from "./SearchBox.module.css";

function SearchBox({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Pass input value to parent component
  };

  return (
    <div className={classes.searchContainer}>
      <label htmlFor="search">Search:</label>
      <textarea
        id="search"
        className={classes.searchBox}
        value={query}
        onChange={handleChange}
        placeholder="Type here to search..."
      />
    </div>
  );
}

export default SearchBox;
