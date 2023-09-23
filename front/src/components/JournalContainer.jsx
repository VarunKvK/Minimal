import { Delete, Edit } from "@mui/icons-material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

function JournalContainer({ Id,Title, Journal,Time }) {
    const {user}=useContext(UserContext)
  return (
    <div className="relative w-[20rem] border-black border-[1px] py-8 px-6 transition-all duration-100 ease-in-out bg-[#699deb] mb-4">
      <Link to={`/${user.username}/${user.id}/journal/${Title}?id=${Id}`}>
      <div className="w-full">
        <h1 className="text-[2rem] font-bold text-[#3f5d8b] mb-2 truncate">{Title}</h1>
        <p className="text-[0.7rem] font-bold text-[#3f5d8b] mb-1">{Time}</p>
      </div>
      </Link>
      <div className="flex gap-4 relative mt-4">
        <Link className="bg-[#3f5d8b] rounded-full p-2 text-white">
          <Edit />
        </Link>
        <button className="bg-[#EB6A6A] rounded-full p-2 text-white">
          <Delete />
        </button>
      </div>
    </div>
  );
}

export default JournalContainer;
