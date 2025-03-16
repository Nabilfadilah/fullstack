"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {signIn, signOut, getProviders, useSession} from "next-auth/react";

const Navbar = () => {
  // const isUserLogIn = true;
  const {data: session} = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full p-3 px-3 bg-gradient-to-tr from-purple-900 to-blue-900 shadow-xl">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/next.svg"
          width={60}
          height={60}
          alt="Next.js Logo"
          className="object-contain"
        />
        <p className="logo_text">AI Menguasai</p>
      </Link>

      {/* Desktop Navigasi */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image} // merubah agar imagenya poto dari email
                width={25}
                height={25}
                className="rounded-full"
                alt="Profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile navigasi */}
      <div className="sm:hidden flex gap-3 relative">
        {session?.user ? (
          <div className="flex relative">
            <Image
              src={session?.user.image} // merubah agar imagenya poto dari email
              width={25}
              height={25}
              className="rounded-full cursor-pointer"
              alt="Next.js Logo"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />

            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
