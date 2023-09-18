import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import TaskContainer from "../components/TaskContainer";
import { UserContext } from "../UserContext";
import Loader from "../components/Loader";

function Index() {
  const { user,ready } = useContext(UserContext);
  const [task, setTasks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/home");
        const data = response.data;
        setTasks(data);
        console.log(task);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // if(ready){
  //   return(
  //     <div className="h-[100vh] flex justify-center itmes-center mt-10"><Loader/></div>
  //   )
  // }
  return (
    <div className="w-full flex justify-center">
      <div className="mt-10">
        <h3 className="mb-2 text-[#1E1E1E] font-semibold text-center w-full">Hello {user?.username}!</h3>
        {task?.length > 0 &&
          task.map((tasks) => {
            return (
              <div className="mb-4" key={tasks._id}>
                <TaskContainer
                  Title={tasks.tasktitle}
                  Task={tasks.todo}
                  Id={tasks._id}
                />
                ;
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Index;
