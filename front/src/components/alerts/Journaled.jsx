import { SaveAltOutlined } from '@mui/icons-material'
import React from 'react'

function Journaled({Title,Id}) {
  return (
    <div className='flex justify-center w-[15rem] p-4 h-auto border-[1px] border-black bg-[#C0EB69]'>
        <h1 className="text-center text-white font-semibold"><SaveAltOutlined/> {Id? "Saved":"Created your journey"} {Title}</h1>
    </div>
  )
}

export default Journaled
