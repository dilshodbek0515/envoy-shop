import Link from "next/link";

const Login = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Link href="/">
        <button
          style={{
            width: 70,
            height: 70,
            borderRadius: 50,
            border: "none",
            outline: "none",
            fontSize: 40,
            backgroundColor: "red",
            position: "absolute",
            top: 20,
            right: 20,
          }}
        >
          X
        </button>
      </Link>
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
            <input
              placeholder="Telefon raqam"
              style={{
                width: "100%",
                height: 70,
                borderRadius: 20,
                backgroundColor: "silver",
                outline: "none",
                border: "none",
                padding: 15,
                fontSize: 18,
              }}
            />
            <input
              placeholder="Parol"
              style={{
                width: "100%",
                height: 70,
                borderRadius: 20,
                backgroundColor: "silver",
                outline: "none",
                border: "none",
                padding: 15,
                fontSize: 18,
              }}
            />
            <p
              style={{
                color: "black ",
                fontSize: 18,
                display: "flex",
                justifyContent: "end",
              }}
            >
              Parol esdan chiqdimi ?
            </p>
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
  );
};

export default Login;
