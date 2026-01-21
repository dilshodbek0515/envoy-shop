'use client'

import { AxiosError } from 'axios'
import { Login } from '../../../../../packages/api/login'
import Link from 'next/link'

const Page = () => {
  // const appLogin = async () => {
  //   try {
  //     const user = await Login({
  //       phone: '+998975790515',
  //       password: 'Dd05150515!'
  //     })
  //     console.log(user)
  //   } catch (error) {
  //     if (error instanceof AxiosError) {
  //       console.log(error)
  //     }
  //   }
  // }

  // return (
  //   <div
  //     style={{
  //       height: '100vh',
  //       display: 'flex',
  //       flexDirection: 'row',
  //       gap: 30,
  //       justifyContent: 'center',
  //       alignItems: 'center'
  //     }}
  //   >
  //     <Link href='/Login'>
  //       <button
  //         style={{
  //           width: 289,
  //           height: 70,
  //           borderRadius: 20,
  //           backgroundColor: '#00BEFF',
  //           fontSize: 20,
  //           border: 'transparent'
  //         }}
  //       >
  //         Login
  //       </button>
  //     </Link>
  //     <Link href='/Register'>
  //       <button
  //         style={{
  //           width: 289,
  //           height: 70,
  //           borderRadius: 20,
  //           backgroundColor: '#00BEFF',
  //           fontSize: 20,
  //           border: 'transparent'
  //         }}
  //       >
  //         Register
  //       </button>
  //     </Link>
  //   </div>
  // )   
  
  
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
          backgroundColor: "white",
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
        K.X.M, [20.01.2026 19:13]
        <div
          style={{
            padding: 20,
            gap: 20,
            display: "flex",
            flexDirection: "column",
          }}
        >
         
         
        </div>
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
            backgroundColor: "silver",
            color: "black",
            fontWeight: 700,
          }}
        >
          Davom etish
        </button>
      </div>
    </div>
  </div>
  )
}

export default Page
