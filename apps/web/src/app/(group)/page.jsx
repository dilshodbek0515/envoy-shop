"use client";

import { AxiosError } from "axios";
import { Login } from "../../../../../packages/api/login";
import Link from "next/link";

const Page = () => {
  const appLogin = async () => {
    try {
      const user = await Login({
        phone: "+998975790515",
        password: "Dd05150515!",
      });
      console.log(user);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        gap: 30,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/Login">
        <button style={{ width: 289, height: 70, borderRadius: 20 }}>
          Login
        </button>
      </Link>
      <Link href="/Register">
        <button style={{ width: 289, height: 70, borderRadius: 20 }}>
          Register
        </button>
      </Link>
    </div>
  );
};

export default Page;
