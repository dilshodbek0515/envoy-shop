'use client'

import Link from "next/link";
import { useState } from "react"



const Page = () => {

  const [role, setRole] = useState('Sotuvchi');
  const [tab, setTab] = useState("Register");



  return (
    <div style={{ height: "100vh" }}>



      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <div
          style={{
            width: 652,
            height: 780,
            outline: "3px solid #262e3d",
            borderRadius: 20,
            backgroundColor: "#171c26",
            position: "relative",
          }}
        >

          <div
            style={{
              width: "100%",
              height: 85,
              backgroundColor: "#262e3d",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 200,
              position: "relative",
            }}
          >
            <div
              onClick={() => setTab("Login")}
              style={{ position: "relative", cursor: "pointer" }}
            >
              <p style={{
                fontSize: 20,
                color: tab === "Login" ? "#00beff" : "#fff"
              }}>Login</p>

              {tab === "Login" && (
                <div
                  style={{
                    width: 310,
                    height: 7,
                    backgroundColor: "#00beff",
                    position: "absolute",
                    bottom: -30,
                    left: -110,
                    borderRadius: 10,
                  }}
                />
              )}
            </div>

            <div
              onClick={() => setTab("Register")}
              style={{ position: "relative", cursor: "pointer" }}
            >
              <p style={{ fontSize: 20, color: tab === "Login" ? "#fff" : "#00beff" }}>Ro'yxatdan o'tish</p>

              {tab === "Register" && (
                <div
                  style={{
                    width: 310,
                    height: 7,
                    backgroundColor: "#00beff",
                    position: "absolute",
                    bottom: -30,
                    left: -50,
                    borderRadius: 10,
                  }}
                />
              )}
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 24,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 30,
            paddingRight: 26,
            paddingLeft: 26
          }}>

            <div
              onClick={() => setRole('Oluvchi')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 270,
                height: 70,
                borderRadius: 20,
                cursor: 'pointer',
                backgroundColor: role === "Oluvchi" ? '#00beff' : "#262e3d",
              }} >
              <p style={{
                color: '#ffff',
                fontSize: 20,
              }}>
                Oluvchi
              </p>
            </div>

            <div
              onClick={() => setRole("Sotuvchi")}
              style={{
                display: 'flex',
                width: 270,
                height: 70,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: role === "Sotuvchi" ? "#00beff" : "#262e3d",
              }} >
              <p style={{
                color: '#ffff',
                fontSize: 20,
              }}>
                Sotuvchi
              </p>
            </div>
          </div>

          <Link href={'/Register'}>
            <button
              style={{
                width: 610,
                height: 70,
                marginRight: 20,
                marginLeft: 20,
                borderRadius: 20,
                outline: "none",
                border: "none",
                position: "absolute",
                bottom: 20,
                backgroundColor: "#00beff",
                color: "#ffff",
                fontSize: 20,
              }}
            >
              Davom etish
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page
