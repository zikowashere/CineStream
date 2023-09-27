import React from "react";
import logo from "@/public/logo_transparent.png";
import Image from "next/image";
import Signinorup from "../signinorup/signinorup";

const Navbar = () => {
  return (
    <div className="flex justify-between bg-black  ">
      <div>
        <Image className="m-3 w-24" src={logo} alt="logo" />
      </div>
      <div className="m-10">
        <Signinorup name="Login" />
      </div>
    </div>
  );
};

export default Navbar;
