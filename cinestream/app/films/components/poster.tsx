"use client";

import { useGetInformationFilm } from "@/app/hooks/films/useGetInformationsFilm";
import { film } from "@/app/type/film";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";

const Poster = ({ film }: { film: film | undefined }) => {
  const { getInformationFilm } = useGetInformationFilm();
  const [descriptionFilm, setDescriptionFilm] = useState<string | undefined>(
    ""
  );
  const fetchFilm = async () => {
    if (film && film.title) {
      const information = await getInformationFilm(film.title);
      if (information) {
        setDescriptionFilm(information.results[0].overview);
      }
    }
  };

  useEffect(() => {
    fetchFilm();
  }, [film]);

  return (
    <div className="relative h-[50vh] bg-gradient-to-r from-gray-800 to-gray-100">
      <div className="flex h-full w-full ">
        <img
          src={`https://image.tmdb.org/t/p/original/${film?.posterCard}`}
          className="flex w-full object-fill"
        />
        <div className=" absolute inset-0 bg-opacity-20 bg-black">
          <div className="flex top-8">
            <p className="  font-bold text-sm  text-white ml-10 mt-4 font-serif  ">
              {" "}
              CineStream
            </p>
            <p className="bg-transparent font-thin text-sm  text-gray-200 ml-2  mt-4 ">
              {" "}
              ORIGINAL
            </p>
          </div>
          <div className="flex flex-col top-3 ">
            <p className="  flex  text-4xl text-black ml-10 mb-4 font-normal ">
              {film?.title}
            </p>
            <Rating
              className="ml-10 "
              name="read-only"
              value={film?.imdbScore}
              readOnly
            />
            <p className=" w-1/4 text-white font-thin ml-10 ">
              {" "}
              {descriptionFilm}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;
