import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import Loader from "../components/Loader";
import TaskContainer from "../components/TaskContainer";
import SmallTask from "../components/SmallTask";

function User() {
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
    <div>
      {user ? (
        <>
          <h1 className="font-semibold text-[2rem] w-full text-center p-4">
            Hello {user?.username}✌
          </h1>
          <div className="w-full p-4 flex justify-center items-center">
            <Link
              to={"/create"}
              className="relative mb-4 p-3 text-center w-[30rem] mt-5 bg-[#C0EB69] text-white border-[1px] border-black"
            >
              Add Task
            </Link>
          </div>
          <div className="w-full grid grid-cols-1 place-items-center">
            {task ? (
              task.length > 0 &&
              task.map((tasks) => {
                return (
                  <div className="mb-4 ml-2" key={tasks._id}>
                    <SmallTask
                      Title={tasks.tasktitle}
                      Task={tasks.todo}
                      Id={tasks._id}
                    />
                  </div>
                );
              })
            ) : (
              <div className="w-full text-center flex justify-center items-center h-[20rem]">
                <h1 className="text-[2rem] font-bold text-[#929292]">
                  !!Haven't create any task!!
                </h1>
              </div>
            )}
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
