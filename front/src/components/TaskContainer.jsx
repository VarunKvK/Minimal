import React from "react";
import CheckBox from "./CheckBox";
import { Link } from "react-router-dom";

function TaskContainer({ Title, Task, Id, User }) {
  return (
    <div className="bg-[#C0EB69] border-black border-[1px] p-6 transition-all duration-100 ease-in-out">
      <div className="relative">
        <h1
          className={
            Title.length > 14
              ? "text-2xl md:text-3xl flex items-center font-semibold text-[#1E1E1E]"
              : "text-3xl md:text-4xl flex items-center font-semibold text-[#1E1E1E]"
          }
        >
          {Title}
          <span className="text-xl"> 🏆</span>
        </h1>
        <div
          className={
            Task?.length < 2
              ? "grid grid-rows-3 mt-4 gap-6"
              : Task?.length > 4
              ? "grid grid-rows-5 mt-4 gap-6"
              : "grid grid-rows-5 mt-4 gap-6"
          }
        >
          {Task?.length > 0 &&
            Task.slice(0, 3).map((task, index) => {
              return (
                <div key={index} className="flex gap-4 items-center">
                  <CheckBox />
                  <p className="text-lg md:text-xl font-medium text-[#35421B]">
                    {task}
                  </p>
                </div>
              );
            })}
          {Task.length > 3 && (
            <div className="text-lg md:text-xl font-medium text-[#35421B]">
              ....
            </div>
          )}
        </div>
        {Task?.length > 3 ? (
          <Link
            to={`/task/${User}/${Id}?taskTitle=${Title}`}
            className={
              Task?.length > 4
                ? "absolute bottom-0 text-center text-[0.8rem] md:text-sm  p-3 bg-white h-auto w-full font-bold border-black border-[1px]"
                : "hidden"
            }
          >
            <span className="text-[#cccccc]">{"<<<"}</span>View More Tasks
            <span className="text-[#cccccc]">{">>>"}</span>
          </Link>
        ) : (
          <div className="mt-6 relative">
            <Link
              to={`/task/${User}/${Id}?taskTitle=${Title}`}
              className="absolute bottom-14 text-center text-[0.8rem] md:text-sm  p-3 bg-white h-auto w-full font-bold border-black border-[1px]"
            >
              <span className="text-[#cccccc]">{"<<<"}</span>View More Tasks
              <span className="text-[#cccccc]">{">>>"}</span>
            </Link>
            <Link
              to={`/editTask/${Title}/${Id}`}
              className={
                "absolute bottom-0 text-center text-[0.8rem] md:text-sm  p-3 px-8 bg-white h-auto w-full font-bold border-black border-[1px]"
              }
            >
              <span className="text-[#cccccc]">{"<<<"}</span>Add More Tasks
              <span className="text-[#cccccc]">{">>>"}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskContainer;
