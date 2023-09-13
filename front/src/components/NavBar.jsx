import { Person } from '@mui/icons-material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const createLink = "/create";
  const isSpecificLink = location.pathname === createLink;
  const userLink = "/user";
  const isUserLink = location.pathname === userLink;
  const loginLink = "/login";
  const isLoginLink = location.pathname === loginLink;
  const registerLink = "/register";
  const isRegisterLink = location.pathname === registerLink;

  return (
    <div className="w-full">
      <div className="w-full p-4 pb-2 text-center border-b-[1.7px] border-gray-600">
        <Link to="/" className="text-2xl text-[#1E1E1E] font-bold">Minimal<span className='text-[#C0EB6A]'>.</span></Link>
      </div>
      {!(isLoginLink || isRegisterLink) && (
        <div className="flex justify-center items-center">
          <div className="flex items-center gap-12 pt-4">
            {isSpecificLink ? (
              <div className="h-[2.5rem] w-[2.5rem] rounded-full bg-[#1E1E1E] flex justify-center items-center text-center text-white">
                <Link to="/user"><Person /></Link>
              </div>
            ) : isUserLink ? (
              <Link to="/create" className="cursor-pointer h-[2.5rem] w-[2.5rem] rounded-full bg-[#1E1E1E] flex justify-center text-center">
                <span className='text-3xl text-[#C0EB6A]'>+</span>
              </Link>
            ) : (
              <>
                <Link to="/create" className="cursor-pointer h-[2.5rem] w-[2.5rem] rounded-full bg-[#1E1E1E] flex justify-center text-center">
                  <span className='text-3xl text-[#C0EB6A]'>+</span>
                </Link>
                <div className="h-[2.5rem] w-[2.5rem] rounded-full bg-[#1E1E1E] flex justify-center items-center text-center text-white">
                  <Link to="/user"><Person /></Link>
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
