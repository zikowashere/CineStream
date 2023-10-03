"use client";
import { useFetchFilmsByGenre } from "@/app/hooks/useFetchFilmsByGenre";
import { useFetchFilmsByLanguage } from "@/app/hooks/useFetchFilmsByLanguage";
import { usePagination } from "@/app/hooks/usePagination";
import { film } from "@/app/type/film";
import { Card } from "@/registry/new-york/ui/card";
import { Pagination, Rating } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import MoviesDisplay from "../../components/moviesDisplay";

interface Props {
  params: { genre: string };
}
const page = ({ params }: Props) => {
  const filmPerPage = 9;
  const [filmsByGenre, setFilmsByGenre] = useState<film[] | undefined>([]);
  const [indexPage, setIndexPage] = useState(1);
  const [lengthFilms, setLengthFilms] = useState(0);
  const { fetchFilmsByGenre } = useFetchFilmsByGenre(params.genre);
  const { PaginationPage } = usePagination();

  const numberOfPage = Math.ceil(lengthFilms / filmPerPage);
  const getPaginateFilms = (films: film[]) => {
    const filmPaginate = PaginationPage({ indexPage, filmPerPage, films });
    return filmPaginate;
  };

  const handlePagination = (event: ChangeEvent<unknown>, value: number) => {
    setIndexPage(value);
  };

  const fetchFilms = async () => {
    try {
      const films = await fetchFilmsByGenre();
      if (films) {
        setLengthFilms(films.length);
        setFilmsByGenre(getPaginateFilms(films));
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
      <div className=" grid grid-rows-3  grid-cols-3 gap-2 text-white overflow-x-hidden m-10">
        {filmsByGenre?.map((film) => (
          <Card
            className=" h-70 bg-teal-100 mr-2 flex flex-col justify-between text-black rounded-3xl"
            key={film.id}
          >
            <div>
              <h1 className="w-full h-32 p-3">{film.title}</h1>
              <p className=" p-3"> {film.premiere}</p>
            </div>
            <Rating
              className="p-3"
              name="read-only"
              value={film.imdbScore}
              readOnly
            />
          </Card>
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

export default page;
