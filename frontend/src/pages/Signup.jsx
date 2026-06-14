import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("DEVELOPER");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleSignup = async () => {

    try {

      setError("");

      const userData = {

        name,

        email,

        password,

        role

      };

      await axios.post(

        "http://localhost:8080/api/users",

        userData

      );

      setSuccess("Account Created Successfully");

      setTimeout(() => {

        navigate("/");

      }, 1500);

    } catch(error){

      setError("Signup Failed");

    }

  };

  return (

    <div className="login-page">

      <div className="login-box">

        <h1 className="login-title">

          Create Account

        </h1>

        <p className="login-subtitle">

          TaskFlow Registration

        </p>

        {

          error && (

            <p style={{

              color:"#ff4d6d",

              marginBottom:"15px",

              textAlign:"center"

            }}>

              {error}

            </p>

          )

        }

        {

          success && (

            <p style={{

              color:"#4ade80",

              marginBottom:"15px",

              textAlign:"center"

            }}>

              {success}

            </p>

          )

        }

        <div className="form-group">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

        </div>

        <div className="form-group">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

        </div>

        <div className="form-group">

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

        </div>

        <div className="form-group">

          <select
            value={role}
            onChange={(e)=>setRole(e.target.value)}
          >

            <option value="ADMIN">

              ADMIN

            </option>

            <option value="DEVELOPER">

              DEVELOPER

            </option>

            <option value="TESTER">

              TESTER

            </option>

          </select>

        </div>

        <button
          className="login-btn"
          onClick={handleSignup}
        >

          Signup

        </button>

        <br/><br/>

        <p
          style={{
            textAlign:"center",
            color:"#cbd5e1",
            cursor:"pointer"
          }}
          onClick={()=>navigate("/")}
        >

          Already have account? Login

        </p>

      </div>

    </div>

  );

}

export default Signup;