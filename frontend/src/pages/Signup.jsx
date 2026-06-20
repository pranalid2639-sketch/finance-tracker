import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import api from "../api";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  async function signup() {

    if (

      !name ||

      !email ||

      !password ||

      !confirmPassword

    ) {

      alert("Please fill all fields");

      return;

    }

    if (

      password !== confirmPassword

    ) {

      alert(

        "Passwords do not match"

      );

      return;

    }

    try {

      await api.post(

        "/auth/signup",

        {

          name,

          email,

          password,

        }

      );

      alert(

        "Signup Successful"

      );

      navigate("/");

    }

    catch (error) {

      alert(

        error.response?.data?.message ||

        "Signup failed"

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

          Create Account

        </h2>

        <input

          type="text"

          placeholder="Name"

          value={name}

          onChange={(e) =>

            setName(

              e.target.value

            )

          }

        />

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

        <input

          type={

            showPassword

            ? "text"

            : "password"

          }

          placeholder="Confirm Password"

          value={confirmPassword}

          onChange={(e) =>

            setConfirmPassword(

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

          onClick={signup}

        >

          Sign Up

        </button>

        <p>

          Already have an account?

          {" "}

          <Link to="/">

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Signup;