import React from "react";

function Faq() {
  return (
    <div>
      <h1 className="text-xl text-[#1E1E1E] font-bold w-full px-8">
        About<span className="text-[#C0EB6A]">.</span>
      </h1>
      <p className=" py-3 px-8">
        Welcome to Minimal, a simple and intuitive task management application
        designed to help you stay organized with ease. Our minimalist approach
        focuses on providing you with a clutter-free experience while
        efficiently managing your tasks.
      </p>
      <div className="px-8">
        <h2 className=" text-[#1E1E1E] font-bold w-full">
          Key Features<span className="text-[#C0EB6A]">.</span>
        </h2>
        <div className="about text-sm border-[1px] border-[#1E1E1E] mt-2 p-4">
          <ul>
            <li className="mb-2">Effortlessly create and manage tasks.</li>
            <li className="mb-2">
              Minimalist user interface for distraction-free productivity.
            </li>
            <li className="mb-2">Customize task titles and descriptions.</li>
            <li className="mb-2">Mark tasks as completed when you're done.</li>
            <li className="mb-2">
              Stay organized with a clean and sleek design.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Faq;
