"use client";

import "./ResetPassword.css";
import { useState } from "react";
import Link from "next/link";
import InputPhone from "../../../../shared/ui/input/InputPhone/InputPhone";
const ResetPassword = () => {
  const [phone, setPhone] = useState("");
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

          <Link className="buttonBox" href={"/SmsPage"}>
            Davom etish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
