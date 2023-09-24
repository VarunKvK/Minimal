import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { QuestionMark, journal } from "@mui/icons-material";
import axios from "axios";
import JournalContainer from "../components/JournalContainer";

function Journal() {
  const { user } = useContext(UserContext);
  const [journal, getJournal] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("/journal").then((res) => {
        const data = res.data;
        getJournal(data);
      });
    };
    fetchData();
  }, []);
  async function removejournals(journalIdToRemove) {
    if (journal) {
      await axios.delete(`/journaldelete/${journalIdToRemove}`).then(()=>{
        const updatedjournalList = journal.filter((journals) => journals._id !== journalIdToRemove);
        getJournal(updatedjournalList);
      })
    }
  }
  return (
    <div>
      <button
        onClick={() => (window.location = "/faq")}
        className="fixed z-10 bottom-2 right-2 h-[2rem] w-[2rem] bg-[#C0EB69] border-[1px] border-black rounded-full flex justify-center items-center text-white"
      >
        <QuestionMark />
      </button>
      {user ? (
        <>
          <h1 className="font-semibold lg:text-[2.5rem] capitalize text-[2rem] w-full text-center p-4">
            Hello {user?.username}
            <span className="">✌</span>
          </h1>
          <div className="w-full p-4 flex justify-center items-center gap-4">
            <Link
              to={"/createJournal"}
              className="relative  sm:mt-0 p-3 text-center w-[30rem] mt-5 bg-[#699deb]  text-white border-[1px] border-black"
            >
              Add Journal
            </Link>
            <Link
              to={`/${user.username}/${user.id}`}
              className="relative  sm:mt-0 p-3 text-center w-[30rem] mt-5 bg-[#C0EB69] text-white border-[1px] border-black"
            >
              Task
            </Link>
          </div>
          <p className="w-full text-center mb-4"><span>🌍</span>Welcome to your world where you express yourself<span>🌍</span></p>
          {journal?.length > 0 ? (<div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:px-12 place-items-center mb-4">
            {journal?.length > 0 &&
              journal?.map((data, index) => {
                return (
                  <div
                  className=""
                    key={index}
                  >
                    <JournalContainer Id={data._id} onDelete={()=>removejournals(data._id)} Title={data.journaltitle} Journal={data.journal} Time={data.timestamp}/>
                  </div>
                );
              })}
          </div>):(
            <>
            <div className="w-full text-center col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center h-[20rem]">
              <h1 className="text-[2rem] font-bold text-[#929292] w-full text-center">
                !!Haven't create any Journey!!
              </h1>
            </div>
          </>
          )}
        </>
      ) : (
        <div className="w-full mt-20 grid gap-4 place-content-center">
          <h1 className="font-semibold text-[2rem] w-full text-center p-4">
            Hello User?
          </h1>
          <h2 className="font-semibold text-2xl text-[#cfcfcf]">
            Login to create your journals
          </h2>
          <Link
            to={"/login"}
            className="p-3 border-[1px] border-black bg-[#C0EB69] font-medium text-xl text-center text-[#6c853c]"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default Journal;
