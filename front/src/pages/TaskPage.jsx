import React, { useContext, useEffect, useState } from "react";
import CheckBox from "../components/CheckBox";
import { ArrowBack, Edit } from "@mui/icons-material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import Deletedialog from "../components/alerts/Deletedialog";

function TaskPage() {
  const {user}=useContext(UserContext)
  const { id } = useParams();
  const [task, getTask] = useState([]);
  const [openBox, setOpen] = useState(false);
  console.log(task)
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
      window.location = `/${user.username}/${user.id}`;
      const taskArray = Array.isArray(task) ? task : [];

      await axios.delete(`/taskdelete/${taskIdToRemove}`).then(() => {
        const updatedTaskList = taskArray.filter((tasks) => tasks._id !== taskIdToRemove);
        getTask(updatedTaskList);
      });
    }
  }
  function CloseBox(){
    setOpen(false)
  }

  return (
    <div className="w-full relative flex justify-center p-10 flex-col md:grid md:place-items-center">
      <div className="h-auto w-full md:w-[40rem] p-8 bg-[#C0EB69] border-[1px] border-[#1E1E1E] relative">
      <Link to={"/"} className="absolute -top-4 -left-4 rounded-full text-white p-2 bg-[#799442]"><ArrowBack/></Link>
        <div className="flex items-center">
          <h1 className="text-[3rem] md:text-[4rem] text-white flex items-center">{task?.tasktitle}<span className="text-[2rem]">😁</span></h1>
        </div>
        <div className="">
          {task?.todo?.length > 0 &&
            task?.todo?.map((todo,index) => {
              return (
                <div key={index} className={`flex gap-4 items-center mb-4 ${todo.completed ? 'completed-task' : ''}`}>
                  <CheckBox selected={todo.name} checkedId={todo._id} Checked={todo.completed}/>
                  <p className={`text-lg  md:text-xl font-medium ${todo.completed ? 'text-[#ffffff]' : 'text-[#35421B]'}`}>
                    {todo.name}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
        <button onClick={()=>setOpen(true)} className="text-white mt-6 bg-[#EB6A6A] p-4 w-full md:w-[40rem] border-[1px] border-[#1E1E1E]">??? Delete this ???</button>
        <Link to={`/editTask/${task?.tasktitle}/${id}`} className="text-white mt-2 bg-[#EBDE6A] text-center border-[1px] border-[#1E1E1E] p-4 w-full md:w-[40rem]">
            !!!Need to add tasks!!!
          </Link>
          {openBox ? (
        <div className="absolute w-full p-4 h-full flex justify-center items-center backdrop-blur-sm">
          <Deletedialog isOpen={openBox} onDelete={()=>removeTasks(task?._id)} Cancel={CloseBox} />
        </div>
      ) : null}
    </div>
  );
}

export default TaskPage;
