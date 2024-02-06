"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function Header() {

        const [toggle, setToggle] = useState(false);

  return (
        <nav className='flex justify-between p-5 px-3 bg-gray-950'>
            {/* <div className='flex gap-3'>
                          <Link href='/' passHref>
                                   <div className='-mb-4 p-1'><Image src='/board.jpg' alt='logo' width={75} height={50} /></div>
                          </Link>
                          <div className='p-3'>
                                  <Link href='/' passHref><h1 className='text-3xl lg:text-7xl md:text-5xl sm:text-4xl text-black font-semibold hover:text-blue-900'>Sri Lanka </h1></Link>
                                  <h2 className='text-2xl md:text-lg  text-blue-900'>The Perl of the Indian Ocean</h2>
                           </div>

            </div> */}
            <div className='hidden md:flex'>
                <ul className='flex gap-8 items-center'>
                        <li className='text-[20px] font-semibold text-pink-500 transition-all ease-in-out cursor-pointer
                         hover:text-gray-300 hover:text-2xl' ><Link href='/'>Home</Link></li>
                        {/* <li className='text-[20px] font-semibold text-black-100 cursor-pointer hover:text-blue-700 hover:text-2xl'
                            ><Link href='/Places'>Places</Link></li> */}
                        {/* <li className='text-[20px] font-semibold text-black-100 cursor-pointer hover:text-blue-700 hover:text-2xl'
                        ><Link href='/Information'> Information</Link> </li> */}
                        <li className='text-[20px] font-semibold text-pink-500 cursor-pointer hover:text-gray-300 hover:text-2xl'
                        ><Link href='/ContactUs'> Contact Us</Link> </li>
                </ul>
                  </div>
                  <div className='md:hidden lg:hidden relative'>
                          {!toggle ? <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                  onClick={() => setToggle(true)} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                  className="w-8 h-8 cursor-pointer text-blue-800 float-right">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                          </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                          onClick={() => setToggle(false)} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                          className="w-8 h-8 cursor-pointer text-blue-800 float-right">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>}
                          {toggle ?
                        <ul className='gap-8 items-center mt-8 bg-gray-300 p-1 z-50 fixed top-5 right-0 w-50%' style={{zIndex: 1000}}>
                                <li className='p-3 text-[18px] font-semibold text-black-100 transition-all ease-in-out cursor-pointer hover:text-blue-700 hover:text-2xl'
                                ><Link href='/'>Home</Link></li>
                                {/* <li className='p-3 text-[18px] font-semibold text-black-100 cursor-pointer hover:text-blue-700 hover:text-2xl'
                                ><Link href='/Places'>Places</Link></li> */}
                                
                                <li className='p-3 text-[18px] font-semibold text-black-100 cursor-pointer hover:text-blue-700 hover:text-2xl'
                                ><Link href='/ContactUs'> Contact Us</Link> </li>
                         </ul> : null}
                  </div>
        </nav>
  )
}

export default Header
