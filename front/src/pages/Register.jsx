import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [input, setInput] = useState({
    email: "",
    username: "",
    password: "",
  });

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

  function postInput(e) {
    e.preventDefault();
    console.log(input)
  }
  return (
    <div className="mt-[5rem]">
      <h1 className="text-center font-semibold text-3xl">Register</h1>
      <div className="flex justify-center mt-4">
        <form action="post" onSubmit={postInput}>
          <div className="mb-4">
            <label className="mt-2 font-medium">Email</label>
            <input
            name="email"
              value={input.email}
              onChange={getInput}
              type="text"
              placeholder="email"
              className="focus:outline-[1px] focus:outline-[#C0EB69] border-[1px] border-black p-3 pl-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="mt-2 font-medium">UserName</label>
            <input
            name="username"
              value={input.username}
              onChange={getInput}
              type="text"
              placeholder="username"
              className="focus:outline-[1px] focus:outline-[#C0EB69] border-[1px] border-black p-3 pl-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="mt-2 font-medium">Password</label>
            <input
            name="password"
              value={input.password}
              onChange={getInput}
              type="text"
              placeholder="password"
              className="focus:outline-[1px] focus:outline-[#C0EB69] border-[1px] border-black p-3 pl-2 w-full"
            />
          </div>
          <div className="relative">
            <button className="relative p-3 w-full mt-3 z-10 bg-[#C0EB69] text-white border-[1px] border-black">
              Register
            </button>
            <div className="absolute w-full p-6 top-4 left-1 border-[1px] border-black"></div>
          </div>
        </form>
      </div>
      <p className="text-center w-full relative top-4 font-medium text-[#636363]">
        You have an account?
        <Link to={"/login"} className="text-[#1E1E1E]">
          Get in
        </Link>
      </p>
    </div>
  );
}

export default Register;
