"use client";
import { useEffect, useRef, useState } from "react";
import "./Sms.css";
import Link from "next/link";

const Sms = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [seconds, setSeconds] = useState(10);
  const inputRef = useRef([]);

  const isComplete = otp.every((item) => item !== "");

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleResendClick = () => {
    if (seconds === 0) {
      setSeconds(10);
    }
  };

  useEffect(() => {
    // Har safar seconds o'zgarganda yangi timer yaratiladi
    if (seconds === 0) return; // Agar 0 bo'lsa, timer kerak emas

    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    // Eski timerni tozalash
    return () => clearInterval(timer);
  }, [seconds]); // seconds o'zgarganda useEffect qayta ishga tushadi

  return (
    <div className="container">
      <div className="box">
        <div className="header">
          <p>Sms</p>
        </div>
        <div className="titleDiv">
          <p className="smsTitle">Telefon raqamga sms kod yuborildi</p>
          <Link href={"/ParolniTiklash"} style={{ color: "#aeb1b8" }}>
            +998 88 145-34-34
          </Link>
        </div>

        <div className="inputDiv">
          {otp.map((_, index) => (
            <div className="inputBoxx" key={index}>
              <input
                className={`inputt ${isComplete ? "success" : ""}`}
                type="string"
                maxLength="1"
                value={otp[index]}
                ref={(el) => (inputRef.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            </div>
          ))}
        </div>
        <p
          className="Sikund"
          onClick={handleResendClick}
          style={{
            cursor: seconds === 0 ? "pointer" : "default",
            color: seconds === 0 ? "#007bff" : "#white",
          }}
        >
          Parolni qayta yuborish:{" "}
          <span style={{ marginLeft: 10, fontWeight: "bold" }}>
            {seconds > 0 ? `${seconds} ` : ""}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Sms;
