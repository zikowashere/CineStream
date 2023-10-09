"use client";
import { useFetchFilmsByLanguage } from "@/app/hooks/films/useFetchFilmsByLanguage";
import { usePagination } from "@/app/hooks/films/usePagination";
import { film } from "@/app/type/film";
import { Card } from "@/registry/new-york/ui/card";
import { Pagination, Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import MoviesDisplay from "../../components/moviesDisplay";

interface Props {
  params: { language: string };
}
const LanguagePage = ({ params }: Props) => {
  const filmPerPage = 9;
  const router = useRouter();
  const [filmsByLanguage, setFilmsByLanguage] = useState<film[] | undefined>(
    []
  );
  const [indexPage, setIndexPage] = useState(1);
  const [lengthFilms, setLengthFilms] = useState(0);
  const { fetchFilmsByLanguage } = useFetchFilmsByLanguage(params.language);
  const { PaginationPage } = usePagination();

  const numberOfPage = Math.ceil(lengthFilms / filmPerPage);

  const getPaginateFilms = (films: film[]) => {
    const filmPaginate = PaginationPage({ indexPage, filmPerPage, films });
    return filmPaginate;
  };

  const handleClickFilm = (film: string) => {
    router.push(`/films/${film}`);
  };

  const handlePagination = (event: ChangeEvent<unknown>, value: number) => {
    setIndexPage(value);
  };

  const fetchFilms = async () => {
    try {
      const films = await fetchFilmsByLanguage();
      if (films) {
        setLengthFilms(films.length);
        setFilmsByLanguage(getPaginateFilms(films));
      }
    } catch (error) {
      console.error("Error; cannot get films :", error);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, [indexPage]);

  return (
    <>
      <div className=" grid  place-items-center grid-rows-3  grid-cols-3 gap-1 text-white overflow-x-hidden ">
        {filmsByLanguage?.map((film) => (
          <div key={film.title} className="m-1 bg-transparent cursor-pointer ">
            <Card
              className="border-none  h-96"
              onClick={() => handleClickFilm(film.title)}
            >
              <img
                className=" object-cover w-full h-full  "
                src={`https://image.tmdb.org/t/p/original/${film.poster}`}
              />
            </Card>
          </div>
        ))}
      </div>
      <div className=" flex justify-center">
        <Pagination
          className="text-white m-10 font-bold bg-teal-100"
          count={numberOfPage}
          shape={"circular"}
          variant="outlined"
          onChange={handlePagination}
        />
      </div>
    </>
  );
};

export default LanguagePage;
