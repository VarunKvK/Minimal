import React from "react";

function Deletedialog({isOpen,onDelete,Cancel}) {
  return (
    <div className={`flex justify-center w-auto p-4 h-auto border-[1px] border-black bg-white ${isOpen ? "block" : "hidden"}`}>
    <div className="">
      <h1 className="text-center">Are you sure you want to delete this journal?</h1>
      <div className="flex gap-4 mt-2 items-center justify-center">
        <button onClick={onDelete} className="w-[5rem] h-[2rem] bg-[#eb6969] text-[#FFF]">
          Yes
        </button>
        <button onClick={Cancel} className="w-[5rem] h-[2rem] text-[#7b9743]">
          Cancel
        </button>
      </div>
    </div>
  </div>
  );
}

export default Deletedialog;
