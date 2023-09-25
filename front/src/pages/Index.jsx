import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import TaskContainer from "../components/TaskContainer";
import { UserContext } from "../UserContext";
import Loader from "../components/Loader";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";
import Arrow from "../components/Arrow";
import { QuestionMark } from "@mui/icons-material";

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

  return (
    <div className="transition-all duration-300 ease-in-out">
      <button
        onClick={() => (window.location = "/faq")}
        className="fixed bottom-2 right-2 h-[2rem] w-[2rem] bg-[#C0EB69] border-[1px] border-black rounded-full flex justify-center items-center text-white"
      >
        <QuestionMark />
      </button>
      {user && task?.length===0 ? (
        <h3 className="mt-2 text-[#1E1E1E] font-semibold text-center w-full">
          Hello {user?.username},create or journal?
        </h3>
      ) : null}
      {user && task?.length > 0 ? (
        <div className="mt-6 mb-6">
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
                        User={user.id}
                        setTasks={setTasks}
                      />
                    </div>
                  );
                })}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      ) : (
        <>
          <div className="w-full flex justify-center transition-all duration-300 ease-in-out">
            <div className="p-6 w-full md:flex md:flex-wrap md:justify-center ">
              <div className="flex flex-col">
                <div className="h-[10rem] md:h-[18rem] xl:w-[38rem] lg:w-[30rem] md:mr-2 md:w-[21rem] w-full grid items-center bg-[#C0EB69] p-4 text-3xl font-semibold text-[#769140] text-center md:rounded-none rounded-bl-[4rem] border-[1px] border-[#1E1E1E]">
                  Create Tasks
                </div>
                <div className="flex">
                  <div className="hidden md:flex h-[4.5rem] xl:w-[27.5rem] lg:w-[19.5rem] mt-2 mr-[1rem] w-[14rem] border-[#1E1E1E] border-[1px] text-[#1E1E1E] text-xl justify-center items-center text-center">
                    <p className="">View Your Tasks</p>
                  </div>
                  <div className="hidden md:flex h-[4.5rem] mt-2 rounded-[3rem] lg:w-[9.5rem] w-[6.3rem] bg-[#1E1E1E] text-[#FFF] text-xl justify-center items-center text-center">
                    <span className="-rotate-90">
                      <Arrow />
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:ml-2">
                <div className="flex mb-2">
                  <div className="hidden md:flex h-[4.5rem] lg:w-[9.5rem] w-[6.3rem]  bg-[#C0EB69] border-[#1E1E1E] border-[1px] text-[#FFF] text-xl justify-center items-center text-center">
                    <span className="rotate-90">
                      <Arrow />
                    </span>
                  </div>
                  <div className="hidden md:flex h-[4.5rem] ml-[1rem] xl:w-[27.5rem] lg:w-[19.5rem] md:w-[13.7rem] w-[14rem] border-[#1E1E1E] border-[1px] text-[#1E1E1E] text-xl justify-center items-center text-center">
                    <p>Read Your Journals</p>
                  </div>
                </div>
                <div className="h-[10rem] md:h-[18rem] xl:w-[38rem] lg:w-[30rem] md:w-[21rem] w-full mt-6 md:mt-0 grid items-center text-[#C0EB69] p-4 text-3xl font-semibold text-center border-[1px] md:rounded-none rounded-r-[4rem] border-[#1E1E1E]">
                  Start Journal
                </div>
              </div>
              {!user ? (
                <div className="relative">
                  <Link
                    to={"/login"}
                    className="h-[5rem] relative z-10 mt-10 w-full grid items-center bg-[#C0EB69] p-4 text-xl font-semibold text-[#769140] text-center md:rounded-none md:w-[43rem] xl:w-[77rem] lg:w-[61rem] rounded-tl-[4rem] border-[1px] border-[#1E1E1E]"
                  >
                    Get Started
                  </Link>
                  <div className="h-[5rem] absolute w-full md:w-[43rem] xl:w-[77rem] lg:w-[61rem] p-6 md:top-12 rounded-tl-[4rem] md:rounded-none top-2 left-2 border-[1px] border-black"></div>
                </div>
              ) : (
                <div className="relative">
                  <Link
                    to={"/create"}
                    className="h-[5rem] relative z-10 mt-10 w-full grid items-center bg-[#C0EB69] p-4 text-xl font-semibold text-[#769140] text-center md:rounded-none md:w-[43rem] xl:w-[77rem] lg:w-[61rem] rounded-tl-[4rem] border-[1px] border-[#1E1E1E]"
                  >
                    Start Organizing
                  </Link>
                  <div className="h-[5rem] absolute w-full md:w-[43rem] xl:w-[77rem] lg:w-[61rem] p-6 md:top-12 rounded-tl-[4rem] md:rounded-none top-2 left-2 border-[1px] border-black"></div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Index;
