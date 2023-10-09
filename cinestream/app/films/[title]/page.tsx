"use client";

import { useFetchFilmByTitle } from "@/app/hooks/films/useFetchFilmByTitle";
import { useGetInformationFilm } from "@/app/hooks/films/useGetInformationsFilm";
import { film } from "@/app/type/film";
import { Button } from "@/registry/new-york/ui/button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Popover, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import ExceptionFilm from "@/app/components/exceptions/exceptionfilm";
// @ts-ignore
import movieTrailer from "movie-trailer";
import FilmExist from "../components/filmExist";

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

    if (params.title) {
      filmByTitle = await fetchFilmByTitle();
      console.log("film", filmByTitle);
    }
    if (filmByTitle !== undefined) {
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
        <FilmExist
          film={film}
          descriptionFilm={descriptionFilm}
          filmTrailer={filmTrailer}
        />
      )}
    </div>
  );
};

export default TitlePage;
