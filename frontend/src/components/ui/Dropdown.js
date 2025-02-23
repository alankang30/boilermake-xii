import React from "react";
import classes from "./Dropdown.module.css";

const Dropdown = ({ label, options, selected, onChange }) => {
  return (
    <div className={classes.dropdown}>
      <label>{label}</label>
      <select value={selected} onChange={(e) => onChange(e.target.value)}>
        <option value="">All</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
