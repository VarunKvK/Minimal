import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Delete, Edit } from "@mui/icons-material";

function SmallTask({ Title, Task, Id }) {
  const { user, ready } = useContext(UserContext);
  const [task, getTask] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/home");
        const data = response.data;
        getTask(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={Title.length>14 ? "h-[13rem] w-[20rem] bg-[#C0EB69] border-black border-[1px] p-6":"h-[11rem] w-[20rem] bg-[#C0EB69] border-black border-[1px] p-6"}>
      <h1
        className={
          Title.length > 14
            ? "text-2xl md:text-xl font-semibold text-[#1E1E1E] text-center"
            : "text-3xl md:text-3xl font-semibold text-[#1E1E1E] text-center"
        }
      >
        {Title}
      </h1>
          <div className="mt-[0.5rem] w-full border-[0.3px] border-[#000]"></div>
      <div className="w-full flex justify-center mt-6 items-center">
        <div className="relative w-[60%] flex">
      <div className="p-1 text-white flex items-center justify-center bg-[#EB6A6A] border-[1px] border-[#000] h-[3rem] w-[3rem] rounded-full">
        <Delete className="cursor-pointer" 
        // onClick={() => removeTasks(todo)}
         />
      </div>
      <div className="p-1 absolute right-0 text-white flex items-center justify-center bg-[#1E1E1E] border-[1px] border-[#000] h-[3rem] w-[3rem] rounded-full">
        <Edit className="cursor-pointer" 
        // onClick={() => removeTasks(todo)}
        />
      </div>
        </div>
    </div>
      </div>
  );
}

export default SmallTask;
