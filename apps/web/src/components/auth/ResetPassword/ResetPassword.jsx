"use client";
import { useState } from "react";
import Input from "../../input/input";
import "./ResetPassword.css";
import Link from "next/link";
const ResetPassword = () => {
  const [phone, setPhone] = useState("");
  return (
    <div className="container">
      <div className="box">
        <div className="header">
          <p>Parolni tiklash</p>
        </div>
        <div className="inputBox">
          <Input
            label={"Telefon raqam"}
            value={phone}
            type="number"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
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
