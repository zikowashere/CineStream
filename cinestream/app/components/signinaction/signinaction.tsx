"use client ";
import React from "react";
import Link from "next/link";
import { Button } from "@/registry/default/ui/button";

interface Props {
  name: string;
  link: string;
  handleConnection?: () => void;
}
const SigninAction = ({ name, link }: Props) => {
  return (
    <Button asChild className="bg-lime-400  hover:bg-green-300 text-black ">
      <Link href={link}>{name}</Link>
    </Button>
  );
};

export default SigninAction;
