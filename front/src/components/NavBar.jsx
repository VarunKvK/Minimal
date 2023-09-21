import { Close, Person, Settings } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";
import SettingMenu from "../components/Settings";
function Navbar() {
  const { user } = useContext(UserContext);
  const [open, setOpen]  = useState(false);
  const location = useLocation();
  const createLink = "/create";
  const isSpecificLink = location.pathname === createLink;
  const userLink = "/user";
  const loguserLink = `/${user?.username}/${user?.id}`;
  const isUserLink = location.pathname === userLink;
  const isLogUserLink = location.pathname === loguserLink;
  const loginLink = "/login";
  const isLoginLink = location.pathname === loginLink;
  const registerLink = "/register";
  const isRegisterLink = location.pathname === registerLink;
  const aboutLink = "/faq";
  const isAboutLink = location.pathname === aboutLink;

  return (
    <div className="w-full transition-all duration-300 ease-in-out">
      <div
        className={
          isAboutLink
            ? "w-full p-4 px-8 pb-2 text-left border-b-[1.7px] border-gray-600"
            : "w-full p-4 pb-2 text-center border-b-[1.7px] border-gray-600"
        }
      >
        <Link to="/" className="text-2xl text-[#1E1E1E] font-bold">
          Minimal<span className="text-[#C0EB6A]">.</span>
        </Link>
      </div>
      {!(isLoginLink || isRegisterLink) && (
        <div className="flex justify-center items-center">
          <div className="flex items-center gap-12 pt-4">
            {isSpecificLink ? (
              <div className="h-[2.5rem] w-[2.5rem] rounded-full bg-[#1E1E1E] flex justify-center items-center text-center text-white">
                <Link to={user ? `/${user?.username}/${user?.id}` : "/user"}>
                  <Person />
                </Link>
              </div>
            ) : isUserLink || isLogUserLink ? (
              <>
                <div className={open? "h-[2.5rem] w-[2.5rem] rounded-full bg-[#EB6A6A] flex justify-center items-center text-center text-white cursor-pointer transition-all duration-300 ease-in-out":"h-[2.5rem] w-[2.5rem] rounded-full bg-[#1E1E1E] flex justify-center items-center text-center text-white transition-all duration-300 ease-in-out"}>
                    {open? <Close onClick={()=>setOpen(false)} className=" rounded-full text-[#FFF]"/>:<Settings onClick={()=>setOpen(true)} />}
                    {open?<SettingMenu />:null}
                </div>
              </>
            ) : isAboutLink ? null : (
              <>
                <Link
                  to={!user?"/login":"/create"}
                  className="cursor-pointer h-[2.5rem] w-[2.5rem] rounded-full bg-[#1E1E1E] flex justify-center text-center"
                >
                  <span className="text-3xl text-[#C0EB6A]">+</span>
                </Link>
                <div className="h-[2.5rem] w-[2.5rem] rounded-full bg-[#1E1E1E] flex justify-center items-center text-center text-white">
                  <Link to={user ? `/${user?.username}/${user?.id}` : "/user"}>
                    <Person />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
