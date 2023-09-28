"use client";
import cover from "@/public/netflix.jpeg";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Navbar from "./components/navbar/navbar";
import Provider from "./components/providers/provider";

export default function Home() {
  const session = useSession();
  console.log("data", session);
  return (
    <main className="flex h-screen flex-col relative ">
      <div className="relative overflow-hidden">
        <Image
          src={cover}
          alt="cover home page"
          sizes="(max-width:425px) 30vw, (max-width:425px) 50vw, 33vw"
          className=" w-screen "
          quality={75}
          priority={false}
        />

        <p className="absolute m-6 text-white font-bold xs:text-xs sm:text-2xl md:text-3xl  lg:text-4xl xl:text-5xl  inset-0 flex items-center justify-center text-center mb-48">
          {" "}
          welcome to cineStream to watch your favourite movie
        </p>
        <p className="absolute m-6 text-white font-light xs:text-xs sm:text-xl md:text-2xl  lg:text-3xl xl:text-4xl  inset-0 flex items-center justify-center text-center">
          Prêt à regarder CineSt ? Saisissez votre adresse e-mail pour vous
          abonner ou réactiver votre abonnement.
        </p>
      </div>
    </main>
  );
}
