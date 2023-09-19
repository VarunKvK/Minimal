import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import TaskContainer from "../components/TaskContainer";
import { UserContext } from "../UserContext";
import Loader from "../components/Loader";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

function Index() {
  const { user, ready } = useContext(UserContext);
  const [task, setTasks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/home");
        const data = response.data;
        setTasks(data);
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
    <div className="">
      <div className="mt-10">
        <h3 className="mb-2 text-[#1E1E1E] font-semibold text-center w-full">
          Hello {user?.username}!
        </h3>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 300: 1, 500: 2, 700: 2, 900: 3 }}
        >
          <Masonry
            className="my-masonry-grid px-6"
            columnClassName="my-masonry-grid_column"
            gutter="2px"
          >
            {task?.length > 0 &&
              task.map((tasks) => {
                return (
                  <div className="my-masonry-grid_item" key={tasks._id}>
                    <TaskContainer
                      Title={tasks.tasktitle}
                      Task={tasks.todo}
                      Id={tasks._id}
                    />
                  </div>
                );
              })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
}

export default Index;
