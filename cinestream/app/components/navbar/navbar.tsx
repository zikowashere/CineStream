"use client";
import React from "react";
import logo from "@/public/logo_transparent.png";
import Image from "next/image";
import SigninAction from "../signinaction/signinaction";
import { useSession } from "next-auth/react";
import { SignOut } from "@/app/signout/signout";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between ">
      <div>
        <Image className="m-3 w-24" src={logo} alt="logo" />
      </div>
      <div className=" flex m-14 ">
        {session?.user ? (
          <div className="flex space-x-10 ">
            <SignOut name={session.user.name} />
          </div>
        ) : (
          <SigninAction name="Login" link="/signin" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
