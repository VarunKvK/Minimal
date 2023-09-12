import { Delete } from "@mui/icons-material";
import React from "react";

function CreateTask() {
  return (
    <div className="">
      <h1 className="font-bold text-[1.5rem] w-full text-center p-4">
        Create Task
      </h1>
      <div className="px-8">
        <form method="post">
          <div className="mb-10 grid gap-1">
            <label className="font-semibold">The creative task name</label>
            <input
              type="text"
              className="h-[3rem] pl-2 border-[1px] border-[#000]  outline-none"
            />
          </div>
          <div className="grid gap-1">
            <label className="font-semibold">Write the things to do</label>
            <div className="flex items-center w-full">
              <input
                type="text"
                className="h-[3rem] pl-2 border-[1px] w-full border-[#000] outline-none"
              />
              <button type="button" className="absolute right-10 text-white text-3xl flex items-center justify-center font-bold h-[2.3rem] w-[2.3rem] bg-[#C0Eb69] border-[1px] border-[#000] outline-none">
                <span className="">+</span>
              </button>
            </div>
          </div>
          <div className="invisible border-[1px] h-auto border-[#000] mt-4">
            <div className="flex items-center p-3 relative">
                <h3>@Design It</h3>
                <div className="p-1 text-white absolute right-2 bg-[#C0Eb69] border-[1px] border-[#000]"><Delete/></div>
            </div>
          </div>
          <div className="w-full mt-[10rem] relative">
          <button className="z-10 relative bg-[#C0EB69] w-full p-4 text-white font-semibold border-[1px] border-black">!!!Create this task!!!</button>
          <div className="absolute w-full p-6 top-4 left-2 font-semibold border-[1px] border-black"></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
