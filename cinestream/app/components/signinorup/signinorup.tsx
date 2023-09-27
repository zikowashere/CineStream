"use client ";
import React from "react";
import Link from "next/link";
import { Button } from "@/registry/default/ui/button";

interface Props {
  name: string;
}
const Signinorup = ({ name }: Props) => {
  return (
    <Button asChild>
      <Link
        href="/signin"
        className="bg-green-300 text-black  hover:bg-lime-400"
      >
        {name}
      </Link>
    </Button>
  );
};

export default Signinorup;
