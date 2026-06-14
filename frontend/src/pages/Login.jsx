import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if(!email || !password){

      setError("Please fill all fields");

      return;
    }

    try {

      setLoading(true);

      setError("");

      const response =
            await loginUser(email, password);

      // STORE JWT TOKEN

      localStorage.setItem(
            "token",
            response.token
      );

      // STORE USER INFO

      localStorage.setItem(
            "user",
            JSON.stringify(response)
      );
      localStorage.setItem(
      "role",
      response.role
);

localStorage.setItem(
      "email",
      response.email
);

      navigate("/dashboard");

    } catch(err){

      setError("Invalid Email or Password");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="login-page">

      <div className="login-box">

        <h1 className="login-title">

          TaskFlow Portal

        </h1>

        <p className="login-subtitle">

          Workflow & Task Management System

        </p>

        {

          error && (

            <p
              style={{
                color:"#ff4d6d",
                marginBottom:"15px",
                fontWeight:"600",
                textAlign:"center"
              }}
            >

              {error}

            </p>

          )

        }

        <div className="form-group">

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

        </div>

        <div className="form-group">

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

        </div>

        <button
          className="login-btn"
          onClick={handleLogin}
        >

          {

            loading
            ? "Logging in..."
            : "Login"

          }

        </button>

        <br/><br/>

        <p
          style={{
            textAlign:"center",
            color:"#cbd5e1",
            cursor:"pointer"
          }}
          onClick={()=>navigate("/signup")}
        >

          Don't have an account? Signup

        </p>

      </div>

    </div>

  );

}

export default Login;