import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'

function User() {
  const {user}=useContext(UserContext)
  // useEffect(()=>{
  //   axios.get("/login").then((data)=>{
  //     console.log("user", data)
  //   })
  // },[])
  return (
    <div>
      {user? <h1 className='font-semibold text-[2rem] w-full text-center p-4'>Hello {user?.username}!</h1>:<div className="w-full mt-20 grid gap-4 place-content-center">
      <h1 className='font-semibold text-[2rem] w-full text-center p-4'>Hello User?</h1>
        <h2 className='font-semibold text-2xl text-[#cfcfcf]'>Login to create your tasks</h2>
        <Link to={"/login"} className='p-3 border-[1px] border-black bg-[#C0EB69] font-medium text-xl text-center text-[#6c853c]'>Login</Link>
      </div>}
    </div>
  )
}

export default User
