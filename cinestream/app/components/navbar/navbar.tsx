"use client";
import React from "react";
import logo from "@/public/logo_transparent.png";
import Image from "next/image";
import SignInAction from "../signinaction/signinaction";
import { useSession } from "next-auth/react";
import { SignOut } from "@/app/signout/signout";
import { Button } from "@/registry/new-york/ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const home = () => {
    router.push("/films");
  };
  const films = () => {
    router.push("/films/filmsfiltred");
  };

  return (
    <div className=" top-0 left-0 right-0 z-50 bg-black p-4 flex justify-between items-center">
      <div className="flex w-28">
        <Image className="  m-3 object-contain " src={logo} alt="logo" />
      </div>
      {session?.user && (
        <>
          <Button
            className="text-white font-thin ml-1 bg-transparent hover:bg-transparent"
            onClick={home}
          >
            Home
          </Button>
          <Button
            className="text-white font-thin ml-1 bg-transparent hover:bg-transparent"
            onClick={films}
          >
            Films
          </Button>
          <Button className="text-white font-thin ml-1 bg-transparent hover:bg-transparent">
            New & Popular
          </Button>
        </>
      )}
      {session?.user ? (
        <div className="flex   ">
          <div className=" flex left-full justify-end">
            <SignOut name={session.user.name} />
          </div>
        </div>
      ) : (
        <SignInAction name="Login" link="/signin" />
      )}
    </div>
  );
};

export default Navbar;
