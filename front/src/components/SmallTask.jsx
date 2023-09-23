import React, { useContext, useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
// import axios from "axios";

function SmallTask({ Title, Task, Id, onDelete }) {
  const { user, ready } = useContext(UserContext);
  // const [task, getTask] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/home");
  //       const data = response.data;
  //       getTask(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div
      className={
        Title.length > 20
          ? "h-auto w-[20rem] bg-[#C0EB69] border-black border-[1px] p-6"
          : "h-auto w-[20rem] bg-[#C0EB69] border-black border-[1px] p-6"
      }
    >
      <Link to={`/task/${user.id}/${Id}?taskTitle=${Title}`}
        className={
          Title.length > 14
            ? "text-2xl md:text-2xl font-semibold text-[#1E1E1E] text-center flex items-center justify-center"
            : "text-3xl md:text-3xl font-semibold text-[#1E1E1E] text-center flex items-center justify-center"
          
        }
      >
        <span className="text-sm">😀</span>{Title}<span className="text-sm">😀</span>
      </Link>
      <div className="mt-[0.5rem] w-full border-[0.3px] border-[#000]"></div>
      <div className="w-full flex justify-center mt-4 items-center">
        <div className="relative w-[60%] flex mb-4 ">
          <div className="p-1 text-white relative flex items-center justify-center bg-[#EB6A6A] border-[1px] border-[#000] h-[3rem] w-[3rem] rounded-full">
            <Delete className="cursor-pointer" onClick={onDelete} />
            <p className="absolute -bottom-6 text-[#1E1E1E]">Delete</p>
          </div>
          <div className="p-1 absolute right-0 text-white flex items-center justify-center bg-[#8dad4d] border-[1px] border-[#000] h-[3rem] w-[3rem] rounded-full">
            <Link to={`/editTask/${Title}/${Id}`}>
              <Edit className="cursor-pointer" />
              <p className="absolute -bottom-6 text-[#1E1E1E]">Edit</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmallTask;
