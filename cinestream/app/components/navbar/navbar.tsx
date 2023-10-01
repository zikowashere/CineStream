"use client";
import React from "react";
import logo from "@/public/logo_transparent.png";
import Image from "next/image";
import SignInAction from "../signinaction/signinaction";
import { useSession } from "next-auth/react";
import { SignOut } from "@/app/signout/signout";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black p-4 flex justify-between">
      <div className="flex w-28">
        <Image className="  m-3 object-contain" src={logo} alt="logo" />
      </div>
      <div className=" flex m-14 ">
        {session?.user ? (
          <div className="flex space-x-10 ">
            <SignOut name={session.user.name} />
          </div>
        ) : (
          <SignInAction name="Login" link="/signin" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
