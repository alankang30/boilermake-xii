import React from "react";
import classes from "./Dropdown.module.css"; // Ensure you import the CSS file

const Dropdown = ({ label, options }) => {
  return (
    <div className={classes.dropdown}>
      <label>{label}</label>
      <select>
        <option value="">Select</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
