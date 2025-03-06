"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Navbar = () => {

    const isUserLogIn = true;

    

  return (
    <nav className='flex-between w-full mb-16 p-3 px-3 bg-gradient-to-tr from-orange-400 to-orange-700 shadow-xl'>
        <Link href="/" className='flex gap-2 flex-center'>
            <Image 
                src="/assets/images/next.svg"
                width={60} 
                height={60} 
                alt="Next.js Logo"
                className='object-contain'
            />
            <p className='logo_text'>AI Menguasai</p>
        </Link>

        {/* desktop navigasi */}
        <div className='sm:flex hidden'>
            {isUserLogIn ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href="/create-prompt" className='black_btn'>
                        Create Post
                    </Link>

                    <button type='button' onClick={signOut} className='outline_btn'>
                        Sign Out
                    </button>

                    <Link href="/profile">
                        <Image 
                            src="/globe.svg"
                            width={25}
                            height={25}
                            className='rounded-full'
                            alt='profile'
                        />
                    </Link>
                </div>
            ): (
                <>

                </>
            )}
        </div>
    </nav>
  )
}

export default Navbar