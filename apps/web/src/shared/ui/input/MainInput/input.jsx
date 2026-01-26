"use client";
import { useState } from "react";
import "./input.css";

const MainInput = ({ label, value = "", error, ...props }) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;
  return (
    <div className={`wrapperI ${isActive ? "active" : ""}`}>
      <label className={`label ${isActive ? "active" : ""}`}>{label}</label>
      <input
        className="input"
        value={value}
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {error && <span className="error_text">{error}</span>}
    </div>
  );
};

export default MainInput;
