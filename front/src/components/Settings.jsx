import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

function Settings() {
    const {user}=useContext(UserContext)
    async function logout(){
      window.location="/"
        await axios.post("/logout") 
    }
  return (
    <div className="z-10 animate-[topDown_.2s_ease-in-out] flex justify-center absolute top-[7.1rem] p-4 h-[7rem] w-[7rem] bg-white shadow-md ">
      <div className="">
        <Link to={"/faq"} className="text-[#1E1E1E] w-auto">
          Faq
        </Link>
        {user?<button onClick={logout} className=" cursor-pointer h-[2rem] w-auto mt-6 bg-[#EB6A6A] text-white text-center flex items-center p-4 border-[1px] border-[#1E1E1E]">
          Logout
        </button>:<Link to={"/register"} className="cursor-pointer h-[2rem] w-auto mt-6 bg-[#C0EB69] text-white text-md font-semibold text-center flex items-center p-4 border-[1px] border-[#1E1E1E]">
          Register
        </Link>}
      </div>
    </div>
  );
}

export default Settings;
