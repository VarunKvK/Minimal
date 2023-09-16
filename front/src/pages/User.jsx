import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import Loader from "../components/Loader";


function User() {
  const { user,ready } = useContext(UserContext);
  if(!ready){
    return(
      <div className="h-[100vh] flex justify-center itmes-center mt-10"><Loader/></div>
    )
  }
  // useEffect(()=>{
  //   axios.get("/login").then((data)=>{
  //     console.log("user", data)
  //   })
  // },[])
  return (
    <div>
      {user ? (
        <>
          <h1 className="font-semibold text-[2rem] w-full text-center p-4">
            Hello {user?.username}✌
          </h1>
          <div className="w-full flex justify-center items-center">
            <Link
              to={"/create"}
              className="relative p-3 text-center w-[30rem] mt-5 bg-[#C0EB69] text-white border-[1px] border-black"
            >
              Add Task
            </Link>
          </div>
          <div className="w-full text-center flex justify-center items-center h-[20rem]">
            <h1 className="text-[2rem] font-bold text-[#929292]">
              !!Haven't create any task!!
            </h1>
          </div>
        </>
      ) : (
        <div className="w-full mt-20 grid gap-4 place-content-center">
          <h1 className="font-semibold text-[2rem] w-full text-center p-4">
            Hello User?
          </h1>
          <h2 className="font-semibold text-2xl text-[#cfcfcf]">
            Login to create your tasks
          </h2>
          <Link
            to={"/login"}
            className="p-3 border-[1px] border-black bg-[#C0EB69] font-medium text-xl text-center text-[#6c853c]"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default User;
