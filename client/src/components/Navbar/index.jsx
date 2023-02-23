import React from 'react';

import { FaUserAlt } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { RiSearch2Line } from 'react-icons/ri';


const Navbar = () => {
  return (
    <>
      <div className='flex items-center w-full justify-between lg:hidden'>
        <div className='w-20'>
          <img src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
            alt="logo"
            className='w-full h-full'
          />
        </div>
        <div className='flex items-center gap-3 relative'>
          <button className='bg-zomato-400 text-white py-3 rounded-full'>
            Use App
          </button>
          <div className='border border-gray-300 text-zomato-400 w-9 h-9 rounded-full '>
            <img src="https://www.pngarts.com/files/11/Avatar-Transparent-Images.png"
              alt="avatar"
              className='w-full h-full rounded-full object-cover'
            />
          </div>
          <div className='absolute shadow-lg py-3 -bottom-20 -right-4 w-full h-full z-20 fex flex-col gap-2'>
              <button>Sign Out</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar