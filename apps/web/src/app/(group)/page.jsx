'use client'

import Link from "next/link";
import { useState } from "react"

const Page = () => {

  const [role, setRole] = useState('Sotuvchi');
  const [tab, setTab] = useState("Register")

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
            outline: "1px solid silver",
            borderRadius: 20,
            backgroundColor: "#ffff",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              height: 85,
              backgroundColor: "silver",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 200,
              position: 'relative'
            }}
          >
            <div
              style={{
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 700,
                  color: "black",
                }}
              >
                Login
              </p>
            </div>

            <div
              style={{
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 700,
                  color: "black",
                }}
              >
                Register
              </p>
              <div
                style={{
                  width: 270,
                  height: 10,
                  backgroundColor: "black",
                  position: "absolute",
                  bottom: -29,
                  left: -100,
                  borderRadius: 10,
                }}
              />
            </div>

          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 24,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 63,
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
                backgroundColor: role === "Oluvchi" ? 'black' : "silver",

              }} >
              <p style={{
                color: role === "Oluvchi" ? "#ffff" : 'black',
                fontWeight: 700,
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
                backgroundColor: role === "Sotuvchi" ? "black" : "silver",

              }} >
              <p style={{
                color: role === "Sotuvchi" ? "#ffff" : 'black',
                fontWeight: 700,
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
                backgroundColor: "black",
                color: "#ffff",
                fontWeight: 700,
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
