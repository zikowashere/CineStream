"use client";
import { CircularProgress } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { useFetchFilms } from "../hooks/useFetchFilms";
import { film } from "../type/film";
import MoviesDisplay from "./components/moviesDisplay";
import Poster from "./components/poster";

function FilmsPage() {
  const [films, setFilms] = useState<film[] | undefined>([]);
  const [trendingFilm, setTrendingFilm] = useState<film[]>([]);
  const [trendFilm, setTrendFilm] = useState<film | undefined>();
  const { fetchFilms } = useFetchFilms();

  const getFilms = async () => {
    const films = await fetchFilms();
    setFilms((prevState) => films);
  };
  const SplitDate = (date: string) => {
    return date.split(",")[1];
  };
  const getTrendingFilm = async () => {
    const films = await fetchFilms();
    setTrendingFilm((prevTrendingFilm) => [
      ...prevTrendingFilm,
      ...films.filter((film: film) => {
        const year = parseInt(SplitDate(film.premiere));
        return year >= 2020;
      }),
    ]);
  };

  useEffect(() => {
    getFilms();
    getTrendingFilm();
  }, []);

  useEffect(() => {
    setTrendFilm(trendingFilm[4]);
  }, [trendingFilm]);

  return (
    <div className=" flex flex-col  overflow-x-hidden relative ">
      <Poster film={trendFilm} />

      <div className=" flex  flex-col justify-center w-full p-5">
        <Suspense
          fallback={<CircularProgress className=" flex " color="secondary" />}
        >
          <MoviesDisplay films={films} sectionTitle="Popular on CineStream" />
        </Suspense>
        <Suspense
          fallback={<CircularProgress className=" flex " color="secondary" />}
        >
          <MoviesDisplay films={trendingFilm} sectionTitle="Trending Now" />
        </Suspense>
      </div>
    </div>
  );
}

export default FilmsPage;
