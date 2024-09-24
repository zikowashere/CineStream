"use client";
import cover from "@/public/netflix.jpeg";
import tv from "@/public/tv.png";
import children from "@/public/children.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/films");
    }
  }, [session]);

  return (
    <main className="flex flex-col h-5/6 relative overflow-x-hidden ">
      <div className="relative overflow-hidden ">
        <Image
          src={cover}
          alt="cover home page"
          sizes="(max-width:425px) 30vw, (max-width:425px) 50vw, 30vw"
          quality={75}
          priority={false}
        />

        <p className="absolute m-6 text-white font-bold xs:text-xs sm:text-2xl md:text-3xl  lg:text-4xl xl:text-5xl  inset-0 flex items-center justify-center text-center mb-48">
          {" "}
          welcome to cineStream to watch your favourite movie
        </p>
        <p className="absolute m-6 text-white font-light xs:text-xs sm:text-xl md:text-2xl  lg:text-3xl xl:text-4xl  inset-0 flex items-center justify-center text-center">
          Ready to watch CineStream? Enter your e-mail address to subscribe or
          reactivate your subscription.
        </p>
      </div>
      <div className=" relative m-6 text-white font-light xs:text-xs sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl inset-0 flex items-center justify-between text-center ">
        <p className="p-4 font-bold text-4xl">Watch CineStream on your TV</p>
        <div className="relative w-full md:w-1/2 lg:w-1/2">
          <div className=" z-20 w-full relative ">
            <Image
              className=""
              sizes="(max-width:425px) 30vw, (max-width:425px) 50vw, 70vw"
              src={tv}
              alt="tv"
              quality={75}
              priority={false}
            />
          </div>
          <div className=" absolute overflow-hidden md:w-full lg:w-full h-full 2xl:w-3/5   inset-10">
            <video
              className="sm:w-full md:w-4/5 lg:w-5/6 xl:w-5/6 2xl:w-5/6  md:h-4/6 sm:h-4/6 lg:h-4/6 xl:h-4/6   "
              autoPlay
            >
              <source src="/videos/video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <p></p>
      </div>
      <div className="flex w-full md:justify-start lg:justify-center overflow-hidden">
        <Image
          className="w-1/3 m-24 object-contain"
          sizes="(max-width:400px) 30vw, (max-width:400px) 50vw, 70vw"
          src={children}
          alt="children"
          quality={75}
          priority={false}
        />
        <p className="mr-44 p-44 2xl:text-8xl xl:text-8xl lg:text-8xl font-bold text-white">
          {" "}
          Create Profiles for children{" "}
        </p>
      </div>
    </main>
  );
}
