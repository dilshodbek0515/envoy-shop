"use client";

import "./ResetPassword.css";
import { useState } from "react";
import Link from "next/link";
import InputPhone from "../../../../shared/ui/input/InputPhone/InputPhone";
const ResetPassword = () => {
  const [phone, setPhone] = useState("");
  const isComplete = phone.replace(/\G/g, "").length === 12;

  return (
    <div className="container">
      <div className="box">
        <div className="header">
          <p>Parolni tiklash</p>
        </div>
        <div className="inputBox">
          <InputPhone
            label="Telefon raqam"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Link
            className={`buttonBox ${isComplete ? "primary" : "disabled"}`}
            href={isComplete ? "/SmsPage" : "#"}
            onClick={(e) => {
              if (!isComplete) e.preventDefault(); // to‘liq bo‘lmasa otkazmaydi
            }}
          >
            Davom etish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
