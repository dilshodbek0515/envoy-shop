"use client";
import { useState } from "react";
import "./InputCall.css";

const InputCall = ({ label, onChange }) => {
  const [focused, setFocused] = useState(false);
  const [numbers, setNumbers] = useState("");

  const isActive = focused || numbers.length > 0;

  const formatNumber = (value) => {
    let v = value;
    if (v.length > 2) v = v.slice(0, 2) + " " + v.slice(2);
    if (v.length > 6) v = v.slice(0, 6) + " " + v.slice(6);
    if (v.length > 9) v = v.slice(0, 9) + " " + v.slice(9);
    return v;
  };

  const handleChange = (e) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "").slice(0, 9);
    setNumbers(onlyNumbers);

    onChange?.({
      target: { value: `998${onlyNumbers}` },
    });
  };

  return (
    <div className={`wrapper ${isActive ? "active" : ""}`}>
      <label className={`label ${isActive ? "active" : ""}`}>{label}</label>

      <div className="inputContainer">
        <span className={`prefix ${isActive ? "show" : ""}`}>+998</span>

        <input
          className="input"
          type="tel"
          value={formatNumber(numbers)}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          inputMode="numeric"
        />
      </div>
    </div>
  );
};

export default InputCall;
