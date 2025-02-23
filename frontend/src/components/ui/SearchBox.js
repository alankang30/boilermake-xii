import { useState } from "react";
import classes from "./SearchBox.module.css";

function SearchBox({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Pass input value to parent component
  };

    // const handleSearch = async () => {
    //     const response = await fetch("http://127.0.0.1:5000/search", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ query }),  // Send query as JSON
    //     });

    //     const data = await response.json();
    //     console.log(data);  // Handle response from Flask
    // };

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
