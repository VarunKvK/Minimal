import { Delete } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CreateTask() {
  const { id } = useParams();
  const [task, setTask] = useState({
    tasktitle: "",
    todoList: [],
  });

  useEffect(() => {
    const idData = async () => {
      if (id) {
        await axios.get("/editTaskcreate/"+id).then((res) => {
          const data=res.data
          setTask({
            tasktitle: data.tasktitle,
            todoList: data.todo,
          });
        });
      }
    };
    idData();
  },[id]);

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

  const [error, setError] = useState({});

  function validation() {
    const newError = {};

    if (!task.tasktitle.trim()) {
      newError.tasktitle = "We need a name to continue.";
    }
    if (task.todoList.length === 0) {
      newError.todoList = "Please add at least one task to your todo list.";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  }
  function addTodo() {
    setTask((prev) => {
      const todoList = [...prev.todoList, task.todo];
      return { ...prev, todoList, todo: "" };
    });
  }

  function removeTasks(todoRemove) {
    const deleteTag = task.todoList.filter((todo) => todo !== todoRemove);
    setTask((prev) => {
      return {
        ...prev,
        todoList: deleteTag,
      };
    });
  }

  async function postTasks(e) {
    e.preventDefault();
    try {
      if (validation()) {
        if (id) {
          await axios.put("/taskcreate", { id, task });
        } else {
          await axios.post("/taskcreate", { task });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex md:justify-center lg:justify-start">
      <div className="w-full md:w-[90%] lg:w-[60%]">
        {id ? <h1 className="font-bold text-[1.5rem] text-[#1E1E1E] w-full text-center p-4 md:text-[2rem] lg:text-[3rem] lg:text-left md:px-8">
          Edit Your Task
        </h1>:(<h1 className="font-bold text-[1.5rem] text-[#1E1E1E] w-full text-center p-4 md:text-[2rem] lg:text-[3rem] lg:text-left md:px-8">
          Create Task
        </h1>)}
        <div className="px-8">
          <form method="post" onSubmit={postTasks}>
            <div className="mb-10 grid gap-1">
              <label className="font-semibold">
                The creative task name<span className="text-[#EB6A6A]">*</span>
              </label>
              <input
                name="tasktitle"
                value={task.tasktitle}
                onChange={getTaskInput}
                type="text"
                className="h-[3rem] pl-2 border-[1px] border-[#000]  outline-none"
              />
              {error?.tasktitle && error.tasktitle ? (
                <p className="text-[#EB6A6A]">{error.tasktitle}</p>
              ) : null}
            </div>
            <div className="grid gap-1">
              <label className="font-semibold">
                Write the things to do<span className="text-[#EB6A6A]">*</span>
              </label>
              <div className="flex items-center w-full relative">
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
                  className="absolute right-2 text-white text-3xl flex items-center justify-center font-bold h-[2.3rem] w-[2.3rem] bg-[#C0Eb69] border-[1px] border-[#000] outline-none"
                >
                  <span className="">+</span>
                </button>
              </div>
              {error?.todoList && error.todoList ? (
                <p className="text-[#EB6A6A]">{error.todoList}</p>
              ) : null}
            </div>
            {task.todoList?.length > 0 &&
              task.todoList?.map((todo, index) => {
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
                      <h3 className="capitalize">@{todo}</h3>
                      <div className="p-1 text-white absolute right-2 bg-[#EB6A6A] border-[1px] border-[#000]">
                        <Delete
                          className="cursor-pointer"
                          onClick={() => removeTasks(todo)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className="w-full mt-[2rem] mb-[2rem] relative">
              {id?(<button className="z-10 relative bg-[#ebde69] w-full p-4 text-white font-semibold border-[1px] border-black">
                !!!Save this task!!!
              </button>):(<button className="z-10 relative bg-[#C0EB69] w-full p-4 text-white font-semibold border-[1px] border-black">
                !!!Create this task!!!
              </button>)}
              <div className="absolute w-full p-6 top-4 left-2 font-semibold border-[1px] border-black"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
