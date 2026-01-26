"use client";
import { useState } from "react";
import "./input.css";

const Input = ({ label, value = "", error, ...props }) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;
  return (
    <div className={`wrapper ${isActive ? "active" : ""}`}>
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

export default Input;
