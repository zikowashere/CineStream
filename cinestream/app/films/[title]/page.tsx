"use client";

import { useFetchFilmByTitle } from "@/app/hooks/useFetchFilmByTitle";
import { film } from "@/app/type/film";
import { Button } from "@/registry/new-york/ui/button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Popover } from "@mui/material";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { useGetInformationFilm } from "@/app/hooks/useGetInformationsFilm";
// @ts-ignore
import movieTrailer from "movie-trailer";

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
    <div className="flex w-full justify-center  p-10 overflow-y-hidden">
      {trailerUrl ? (
        <div className="relative  ">
          <Popover
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
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
        <div className="flex flex-col w-full relative ">
          <img
            src={`https://image.tmdb.org/t/p/original/${posterFilm}`}
            className="object-cover h-2/3"
            key={film?.id}
          />
          <Button
            className="top-1/3 m-10 text-gray-800 absolute bg-gray-300 border-none rounded-md  hover:bg-gray-300  text-lg font-medium "
            onClick={filmTrailer}
          >
            Play
            <PlayArrowIcon />
          </Button>
          <p className=" bottom-3/4 absolute font-bold text-4xl  text-white p-10 mb-4 ">
            {" "}
            {film?.title}
          </p>
          <p className=" bottom-2/3 absolute w-1/2 text-white p-10 ">
            {" "}
            {descriptionFilm}
          </p>
        </div>
      )}
    </div>
  );
};

export default TitlePage;
