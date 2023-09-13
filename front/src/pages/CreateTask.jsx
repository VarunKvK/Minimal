import { Delete } from "@mui/icons-material";
import React, { useState } from "react";

function CreateTask() {
  const [task, setTask] = useState({
    tasktitle: "",
    todoList: [],
  });
  function getTaskInput(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setTask((preV) => {
      return {
        ...preV,
        [name]: value,
      };
    });
  }

  const [error,setError]=useState({})

      function validation(){
        const newError={}

        if(!task.tasktitle.trim()){
          newError.tasktitle="We need a name to continue."
        }
        if(task.todoList.length===0){
          newError.todoList="Please add at least one task to your todo list."
        }
        setError(newError)

      }
  function addTodo() {
    setTask((prev) => {
      const todoList=[...prev.todoList, task.todo]
      return { ...prev, todoList, todo: "" };
    });
  }

  function removeTasks(todoRemove){
    const deleteTag=task.todoList.filter((todo)=>todo !== todoRemove )
    setTask((prev)=>{
      return{
        ...prev,todoList:deleteTag
      }
    })
  }

  function postTasks(e) {
    e.preventDefault();
    if(validation()){console.log(task);}
  }
  return (
    <div className="">
      <h1 className="font-bold text-[1.5rem] w-full text-center p-4">
        Create Task
      </h1>
      <div className="px-8">
        <form method="post" onSubmit={postTasks}>
          <div className="mb-10 grid gap-1">
            <label className="font-semibold">The creative task name<span className="text-[#EB6A6A]">*</span></label>
            <input
              name="tasktitle"
              value={task.tasktitle}
              onChange={getTaskInput}
              type="text"
              className="h-[3rem] pl-2 border-[1px] border-[#000]  outline-none"
            />
            {error?.tasktitle && error.tasktitle ? (<p className="text-[#EB6A6A]">{error.tasktitle}</p>) : null}
          </div>
          <div className="grid gap-1">
            <label className="font-semibold">Write the things to do<span className="text-[#EB6A6A]">*</span></label>
            <div className="flex items-center w-full">
              <input
                name="todo"
                value={task.todo}
                onChange={getTaskInput}
                type="text"
                className="h-[3rem] pl-2 border-[1px] w-full border-[#000] outline-none"
              />
              <button
                onClick={addTodo}
                type="button"
                className="absolute right-10 text-white text-3xl flex items-center justify-center font-bold h-[2.3rem] w-[2.3rem] bg-[#C0Eb69] border-[1px] border-[#000] outline-none"
              >
                <span className="">+</span>
              </button>
            </div>
            {error?.todoList && error.todoList ? (<p className="text-[#EB6A6A]">{error.todoList}</p>) : null}
          </div>
          {task.todoList?.length > 0 &&
            task.todoList?.map((todo,index) => {
              return (
                <div
                key={index}
                  className={
                    task.todoList.length > 0
                      ? "visible border-[1px] h-auto border-[#000] mt-4"
                      : "invisible"
                  }
                >
                  <div className="flex items-center p-3 relative">
                    <h3>@{todo}</h3>
                    <div className="p-1 text-white absolute right-2 bg-[#C0Eb69] border-[1px] border-[#000]">
                      <Delete className="cursor-pointer" onClick={()=>removeTasks(todo)}/>
                    </div>
                  </div>
                </div>
              );
            })}
          <div className="w-full mt-[10rem] relative">
            <button className="z-10 relative bg-[#C0EB69] w-full p-4 text-white font-semibold border-[1px] border-black">
              !!!Create this task!!!
            </button>
            <div className="absolute w-full p-6 top-4 left-2 font-semibold border-[1px] border-black"></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
