"use client";

import { useFetchFilmByTitle } from "@/app/hooks/useFetchFilmByTitle";
import { film } from "@/app/type/film";
import { Button } from "@/registry/new-york/ui/button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Popover, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { useGetInformationFilm } from "@/app/hooks/useGetInformationsFilm";
// @ts-ignore
import movieTrailer from "movie-trailer";
import Poster from "../components/poster";

interface Props {
  params: { title: string };
}

const TitlePage = ({ params }: Props) => {
  const [open, setOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [posterFilm, setPosterFilm] = useState<string | undefined>("");
  const [descriptionFilm, setDescriptionFilm] = useState<string | undefined>(
    ""
  );
  const [film, setFilm] = useState<film | undefined>();
  const { fetchFilmByTitle } = useFetchFilmByTitle(params.title);
  const { getInformationFilm } = useGetInformationFilm();

  const closeModal = () => {
    setOpen(false);
    setTrailerUrl("");
  };

  const openModal = () => setOpen(true);

  const fetchFilm = async () => {
    let filmByTitle;
    const information = getInformationFilm(params.title);

    if (params.title) filmByTitle = await fetchFilmByTitle();
    if (filmByTitle) {
      setFilm(filmByTitle);
      information.then((information) => {
        setPosterFilm(information.results[0].backdrop_path);
        setDescriptionFilm(information.results[0].overview);
      });
    }
  };

  const filmTrailer = async () => {
    const fullUrl = await movieTrailer(decodeURIComponent(params.title) || "");
    if (fullUrl) {
      const urlParams = new URL(fullUrl).search;
      const urlSearchParams = new URLSearchParams(urlParams);
      const movieIdOnYoutube = urlSearchParams.get("v");
      if (movieIdOnYoutube) {
        setTrailerUrl(movieIdOnYoutube);
        openModal();
      }
    }
  };

  useEffect(() => {
    fetchFilm();
  }, []);

  return (
    <div className="flex w-full justify-center  p-10 overflow-y-hidden  ">
      {trailerUrl ? (
        <div className="relative  h-96    ">
          <Popover
            style={{
              display: "flex",
              marginInline: "25%",
              top: "10%",
              width: "50%",
              height: "50%",
            }}
            anchorOrigin={{
              vertical: "center",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <YouTube
              videoId={trailerUrl}
              opts={{
                playerVars: {
                  autoplay: 1,
                },
              }}
            />
            <Button
              className=" absolute rounded-full top-0 right-0 bg-black text-white cursor-pointer font-bold hover:bg-lime-400"
              onClick={closeModal}
            >
              X
            </Button>
          </Popover>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default TitlePage;
