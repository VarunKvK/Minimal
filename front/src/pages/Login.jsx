import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

function Login() {
  const [redirect, setRedirect] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  function validation() {
    const newError = {};

    if (!input.email.trim()) {
      newError.email = "We need your email to login";
    } else if (!isValid(input.email)) {
      newError.email = "The email format is not correct";
    }

    if (!input.password.trim()) {
      newError.password = "We need your password to login";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  }

  function isValid() {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(input.email);
  }
  function getInput(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((preV) => {
      return {
        ...preV,
        [name]: value,
      };
    });
  }

  async function postInput(e) {
    e.preventDefault();
    if (validation()) {
      await axios.post("/login", { input }).then(() => setRedirect(true));
    }
  }
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div className="mt-[5rem]">
      <h1 className="text-center font-semibold text-3xl">Login</h1>
      <div className="flex justify-center mt-4">
        <form method="post" onSubmit={postInput}>
          <div className="mb-4">
            <label className="mt-2 font-medium">Email</label>
            <input
              onChange={getInput}
              name="email"
              type="text"
              value={input.email}
              placeholder="email"
              className="focus:outline-[1px] focus:outline-[#C0EB69] border-[1px] border-black p-3 pl-2 w-full"
            />
            {error?.email && error.email ? (
              <p className="text-[#EB6A6A]">{error.email}</p>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="mt-2 font-medium">Password</label>
            <input
              onChange={getInput}
              type="password"
              name="password"
              value={input.password}
              placeholder="password"
              className="focus:outline-[1px] focus:outline-[#C0EB69] border-[1px] border-black p-3 pl-2 w-full"
            />
            {error?.password && error.password ? (
              <p className="text-[#EB6A6A]">{error.password}</p>
            ) : null}
          </div>
          <div className="relative">
            <button className="relative p-3 w-full mt-3 z-10 bg-[#C0EB69] text-white border-[1px] border-black">
              Login
            </button>
            <div className="absolute w-full p-6 top-4 left-1 border-[1px] border-black"></div>
          </div>
        </form>
      </div>
      <p className="text-center w-full relative top-4 font-medium text-[#636363]">
        You don't have an account?
        <Link to={"/register"} className="text-[#1E1E1E]">
          Get an account
        </Link>
      </p>
    </div>
  );
}

export default Login;
