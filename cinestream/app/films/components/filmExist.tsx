import ExceptionFilm from "@/app/components/exceptions/exception";
import { film } from "@/app/type/film";
import { Button } from "@/registry/new-york/ui/button";
import { Rating } from "@mui/material";
import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const FilmExist = ({
  film,
  filmTrailer,
  descriptionFilm,
}: {
  film: film | undefined;
  filmTrailer: () => void;
  descriptionFilm: string | undefined;
}) => {
  return (
    <>
      {film ? (
        <div className="relative w-full h-[70vh]  bg-gradient-to-r from-gray-800 to-gray-100">
          <div className="flex  h-full w-full ">
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
              <div className="flex flex-col top-3 w-1/2 ">
                <p className=" flex  text-4xl text-black ml-10 mb-4 font-normal ">
                  {film?.title}
                </p>
                <Rating
                  className="ml-10 "
                  name="read-only"
                  value={film?.imdbScore}
                  readOnly
                />
                <p className="  text-white font-thin ml-10 ">
                  {" "}
                  {descriptionFilm}
                </p>
                <Button
                  className=" w-1/5 m-8 p-5 text-gray-800  bg-gray-300 border-none rounded-md  hover:bg-gray-300  text-lg font-medium "
                  onClick={filmTrailer}
                >
                  Play
                  <PlayArrowIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ExceptionFilm message="this movie doesn't exist in DataBase " />
      )}
    </>
  );
};

export default FilmExist;
