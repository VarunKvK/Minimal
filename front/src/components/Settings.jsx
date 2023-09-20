import React from 'react'
import { Link } from 'react-router-dom'

function Settings() {
  return (
    <div className='z-10 absolute p-4 h-[7rem] w-[7rem] bg-white shadow-md '>
        <Link to={"/faq"} className="text-[#1E1E1E] mb-2">Faq</Link>
        <button className='h-[2rem] w-auto bg-[#C0EB69] text-white text-center flex items-center p-4 border-[1px] border-[#1E1E1E]'>Logout</button>
    </div>
  )
}

export default Settings
