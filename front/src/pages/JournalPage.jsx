import React, { useContext, useEffect, useState } from "react";
import { Edit } from "@mui/icons-material";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import Deletedialog from "../components/alerts/Deletedialog";

function JournalPage() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [journal, getJournal] = useState();
  const [openBox, setOpen] = useState(false);

  useEffect(() => {
    const fetchjournal = async () => {
      try {
        const response = await axios.get(`/editJournalCreate/${id}`);
        const data = response.data;
        getJournal(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchjournal();
  }, []);

  async function removeJournal(journalIdToRemove) {
    if (journal) {
      window.location = `/${user.username}/${user.id}`;
      await axios.delete(`/journaldelete/${journalIdToRemove}`).then(() => {
        const updatedjournalList = journal.filter(
          (journals) => journals._id !== journalIdToRemove
        );
        getJournal(updatedjournalList);
      });
    }
  }

  function CloseBox(){
    setOpen(false)
  }

  return (
    <div className="w-full flex justify-center items-center p-10 flex-col md:grid md:place-items-center">
      <div className="h-auto w-full md:w-[40rem] p-8 bg-[#699deb] border-[1px] border-[#1E1E1E] relative">
        <div className="flex items-center">
          <h1 className="text-3xl text-semibold md:text-3xl text-white flex items-center">
            {journal?.journaltitle}
            <span className="text-md text-[2rem]">🌕</span>
          </h1>
        </div>
        <div className="mt-4">
          <p className="">{journal?.journal}</p>
        </div>
      </div>
      <button
        onClick={() => setOpen(true)}
        className="text-white mt-6 bg-[#EB6A6A] p-4 w-full md:w-[40rem] border-[1px] border-[#1E1E1E]"
      >
        ??? Delete this ???
      </button>
      <Link
        to={`/editJournal/${journal?.journaltitle}/${id}`}
        className="text-white mt-2 bg-[#EBDE6A] text-center border-[1px] border-[#1E1E1E] p-4 w-full md:w-[40rem]"
      >
        !!!Need to add journals!!!
      </Link>
      {openBox ? (
        <div className="absolute w-full p-4 h-full flex justify-center items-center backdrop-blur-sm">
          <Deletedialog isOpen={openBox} onDelete={()=>removeJournal(journal._id)} Cancel={CloseBox} />
        </div>
      ) : null}
    </div>
  );
}

export default JournalPage;
