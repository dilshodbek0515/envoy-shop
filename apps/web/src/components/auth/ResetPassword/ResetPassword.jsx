"use client";

import { useState } from "react";
import "./ResetPassword.css";
import Link from "next/link";
import InputCall from "../../inputCall/InputCall";
const ResetPassword = () => {
  const [phone, setPhone] = useState("");
  return (
    <div className="container">
      <div className="box">
        <div className="header">
          <p>Parolni tiklash</p>
        </div>
        <div className="inputBox">
          <InputCall
            label="Telefon raqam"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <Link className="buttonBox" href={"/SmsPage"}>
            Davom etish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
