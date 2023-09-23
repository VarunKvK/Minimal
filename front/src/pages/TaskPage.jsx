import React, { useContext, useEffect, useState } from "react";
import CheckBox from "../components/CheckBox";
import { Edit } from "@mui/icons-material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

function TaskPage() {
  const {user}=useContext(UserContext)
  const { id } = useParams();
  const [task, getTask] = useState([]);
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`/editTaskcreate/${id}`);
        const data = response.data;
        getTask(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTask();
  }, []);

  async function removeTasks(taskIdToRemove) {
    if (task) {
      const taskArray = Array.isArray(task) ? task : [];

      window.location=`/${user.username}/${user.id}`
      await axios.delete(`/taskdelete/${taskIdToRemove}`).then(() => {
        const updatedTaskList = taskArray.filter((tasks) => tasks._id !== taskIdToRemove);
        getTask(updatedTaskList);
      });
    }
  }

  return (
    <div className="w-full flex justify-center p-10 flex-col md:grid md:place-items-center">
      <div className="h-auto w-full md:w-[40rem] p-8 bg-[#C0EB69] border-[1px] border-[#1E1E1E] relative">
        <div className="flex items-center">
          <h1 className="text-[3rem] md:text-[4rem] text-white flex items-center">{task?.tasktitle}<span className="text-[2rem]">😁</span></h1>
        </div>
        <div className="">
          {task?.todo?.length > 0 &&
            task?.todo?.map((todo,index) => {
              return (
                <div key={index} className="flex items-center mt-6">
                  <CheckBox />
                  <p className="ml-4 text-xl md:text-2xl font-medium text-[#35421B]">
                    {todo}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
        <button onClick={()=>removeTasks(task?._id)} className="text-white mt-6 bg-[#EB6A6A] p-4 w-full md:w-[40rem] border-[1px] border-[#1E1E1E]">??? Delete this ???</button>
        <Link to={`/editTask/${task?.tasktitle}/${id}`} className="text-white mt-2 bg-[#EBDE6A] text-center border-[1px] border-[#1E1E1E] p-4 w-full md:w-[40rem]">
            !!!Need to add tasks!!!
          </Link>
    </div>
  );
}

export default TaskPage;
