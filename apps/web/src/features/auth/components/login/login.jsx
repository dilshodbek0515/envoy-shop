"use client";
import Link from "next/link";
import "./login.css";
import { useState } from "react";
import Input from "../../../../shared/ui/input/MainInput/input";

const Login = () => {
  const [active, setActive] = useState("login");
  const [phone, setPhone] = useState("");
  const [parol, setParol] = useState("");

  return (
    <div className="container">
      <div className="login_box">
        <div className="top_box">
          <Link
            href={"/Login"}
            className={`login_selected ${active === "login" ? "active" : ""}`}
            onClick={() => setActive("login")}
          >
            Kirish
          </Link>
          <Link
            href={"/Role"}
            className={`register_selected ${
              active === "register" ? "active" : ""
            }`}
            onClick={() => setActive("register")}
          >
            Royxatdan otish
          </Link>
          <span
            className={`underline ${active === "register" ? "right" : "left"}`}
          />
        </div>

        <div className="bottom_box">
          <div className="forma">
            <Input
              label={"Telefon raqam"}
              value={phone}
              type="text"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <Input
              label={"Parol"}
              value={parol}
              type="password"
              onChange={(e) => {
                setParol(e.target.value);
              }}
            />
            <Link href={"/ResetPassword"} className="buton">
              Parol esdan chiqdimi
            </Link>
          </div>

          <button className="bottom_btn">Dasturga kirish</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
