import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import SaveDialog from "../components/alerts/SaveDialog";
import { UserContext } from "../UserContext";
import Journaled from "../components/alerts/Journaled";

function CreateJournal() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [text, setjournal] = useState({
    journalTitle: "",
    journal: "",
  });
  const [error, setError] = useState({});
  const [save, setSave] = useState(false);
  const [created, setCreate] = useState(false);

  useEffect(() => {
    const idData = async () => {
      if (id) {
        await axios.get("/editJournalCreate/" + id).then((res) => {
          const data = res.data;
          setjournal({
            journalTitle: data.journaltitle,
            journal: data.journal,
          });
        });
      }
    };
    idData();
  }, [id]);

  function validation() {
    const newError = {};

    if (!text.journalTitle.trim()) {
      newError.journalTitle = "We need a name to continue.";
    }
    if (!text.journal.trim()) {
      newError.journal = "Please journal your day";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  }
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setjournal((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  async function postJournal(e) {
    e.preventDefault();
    if (validation()) {
      const currentTimestamp = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
      const formattedTimestamp = currentTimestamp.toLocaleString(
        "en-US",
        options
      );
      if (!id) {
        setCreate(true)
        navigate(`/${user.username}/${user.id}/journal`)
        await axios.post("/journal", { text, formattedTimestamp }).then(() => {
          setjournal({
            journalTitle: "",
            journal: "",
          })
        });
      } else {
        await axios.put("/journal", { id, text ,formattedTimestamp}).then(()=>{
          setSave(true)
          navigate(`/${user.username}/${user.id}/journal/${text.journalTitle}?id=${id}`);
        });
      }
    }
  }
  return (
    <div className="flex justify-center items-center md:justify-center lg:justify-start">
      <div className="w-full md:w-[90%] lg:w-[60%]">
        {id ? (
          <h1 className="font-bold text-[1.5rem] text-[#1E1E1E] w-full text-center p-4 md:text-[2rem] lg:text-[3rem] lg:text-left md:px-8">
            Edit Your journal
          </h1>
        ) : (
          <h1 className="font-bold text-[1.5rem] text-[#1E1E1E] w-full text-center p-4 md:text-[2rem] lg:text-[3rem] lg:text-left md:px-8">
            Journal Your Day
          </h1>
        )}
        <div className="px-8">
          <form method="post" onSubmit={postJournal}>
            <div className="mb-10 grid gap-1">
              <label className="font-semibold">
                The creative journal<span className="text-[#EB6A6A]">*</span>
              </label>
              <input
                name="journalTitle"
                onChange={handleChange}
                value={text.journalTitle}
                type="text"
                className="h-[3rem] pl-2 border-[1px] border-[#000]  outline-none"
              />
              {error?.journalTitle && error.journalTitle ? (
                <p className="text-[#EB6A6A]">{error.journalTitle}</p>
              ) : null}
            </div>
            <div className="grid gap-1">
              <label className="font-semibold">
                Write your journal<span className="text-[#EB6A6A]">*</span>
              </label>
              <div className="flex items-center w-full relative">
                <textarea
                  name="journal"
                  type="text"
                  value={text.journal}
                  onChange={handleChange}
                  placeholder="Journal...."
                  className="overflow-hidden mt-2 h-auto pl-2 border-none w-full border-[#000] outline-none"
                />
              </div>
              {error?.journal && error.journal ? (
                <p className="text-[#EB6A6A]">{error.journal}</p>
              ) : null}
            </div>
            <div className="w-full mt-[2rem] mb-[2rem] relative">
              {id ? (
                <button className="z-10 relative bg-[#ebde69] w-full p-4 text-white font-semibold border-[1px] border-black">
                  !!!Save this journey!!!
                </button>
              ) : (
                <button className="z-10 relative bg-[#699deb] w-full p-4 text-white font-semibold border-[1px] border-black">
                  !!!Journal this!!!
                </button>
              )}
              <div className="absolute w-full p-6 top-4 left-2 font-semibold border-[1px] border-black"></div>
            </div>
          </form>
        </div>
      </div>
      {save ? (
        <div className="absolute z-20 p-4 h-full flex justify-center items-center w-full backdrop-blur-sm">
          <SaveDialog Title={text.journalTitle}/>
        </div>
      ) : null}
      {created ? (
        <div className="absolute z-20 p-4 h-full flex justify-center items-center w-full backdrop-blur-sm">
          <Journaled Title={text.journalTitle} Id={id}/>
        </div>
      ) : null}
    </div>
  );
}

export default CreateJournal;
