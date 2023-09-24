import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import Loader from "../components/Loader";
import TaskContainer from "../components/TaskContainer";
import SmallTask from "../components/SmallTask";
import { QuestionMark } from "@mui/icons-material";

function User() {
  const {id}=useParams();
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

  async function removeTasks(taskIdToRemove) {
    if (task) {
      await axios.delete(`/taskdelete/${taskIdToRemove}`).then(()=>{

        const updatedTaskList = task.filter((tasks) => tasks._id !== taskIdToRemove);
      getTask(updatedTaskList);
      })
    }
  }

  return (
    <div>
      <button onClick={()=>window.location="/faq"} className="fixed bottom-2 right-2 h-[2rem] w-[2rem] bg-[#C0EB69] border-[1px] border-black rounded-full flex justify-center items-center text-white"><QuestionMark/></button>
      {user ? (
        <>
          <h1 className="font-semibold lg:text-[2.5rem] capitalize text-[2rem] w-full text-center p-4">
            Hello {user?.username}<span className="">✌</span>
          </h1>
          <div className="w-full p-4 flex justify-center items-center gap-4">
            <Link
              to={"/create"}
              className="relative mb-4 sm:mt-0 p-3 text-center w-[30rem] mt-5 bg-[#C0EB69] text-white border-[1px] border-black"
            >
              Add Task
            </Link>
            <Link
              to={`/${user.username}/${user.id}/journal`}
              className="relative mb-4 sm:mt-0 p-3 text-center w-[30rem] mt-5 bg-[#699deb] text-white border-[1px] border-black"
            >
            Journal
            </Link>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:px-6 place-items-center mb-4">
            {task?.length > 0  ? (
              task.map((tasks) => {
                return (
                  <div className="mb-4 ml-2" key={tasks._id}>
                    <SmallTask
                      Title={tasks.tasktitle}
                      Task={tasks.todo}
                      Id={tasks._id}
                      // Give a warning before deleting 
                      onDelete={()=>removeTasks(tasks._id)}
                    />
                  </div>
                );
              })
            ) : (
              <>
              <div className="w-full text-center col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center h-[20rem]">
                <h1 className="text-[2rem] font-bold text-[#929292] w-full text-center">
                  !!Haven't create any task!!
                </h1>
              </div>
            </>
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
