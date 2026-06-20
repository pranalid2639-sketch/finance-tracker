import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import api from "../api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  async function login() {

    if (!email || !password) {

      alert("Please fill all fields");

      return;

    }

    try {

      const response = await api.post(

        "/auth/login",

        {

          email,

          password,

        }

      );

      localStorage.setItem(

        "token",

        response.data.token

      );

      navigate(

        "/dashboard"

      );

    }

    catch (error) {

      alert(

        error.response?.data?.message ||

        "Invalid credentials"

      );

    }

  }

  return (

    <div className="auth-container">

      <div className="auth-box">

        <h1>

          💰 Finance Tracker

        </h1>

        <h2>

          Login

        </h2>

        <input

          type="email"

          placeholder="Email"

          value={email}

          onChange={(e) =>

            setEmail(

              e.target.value

            )

          }

        />

        <input

          type={

            showPassword

            ? "text"

            : "password"

          }

          placeholder="Password"

          value={password}

          onChange={(e) =>

            setPassword(

              e.target.value

            )

          }

        />

        <label className="show-password">

          <input

            type="checkbox"

            checked={showPassword}

            onChange={() =>

              setShowPassword(

                !showPassword

              )

            }

          />

          Show Password

        </label>

        <button

          onClick={login}

        >

          Login

        </button>

        <p>

          Don't have an account?

          {" "}

          <Link to="/signup">

            Sign Up

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;