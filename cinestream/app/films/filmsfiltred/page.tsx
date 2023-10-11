"use client";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { useFetchFilms } from "../../hooks/films/useFetchFilms";
import { film } from "../../type/film";
import FilterGenre from "../components/filterGenre";
import FilterLanguage from "../components/filterLanguage";
import MoviesDisplay from "../components/moviesDisplay";

function FilmsPage() {
  const router = useRouter();
  const [posterFilm, setPosterFilm] = useState<string>("");
  const [films, setFilms] = useState<film[] | undefined>([]);
  const [trendingFilm, setTrendingFilm] = useState<film[]>([]);
  const [title, setTitle] = useState("");

  const { fetchFilms } = useFetchFilms();

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleSearchFilm = () => {
    if (title !== "") router.push(`/films/${title}`);
  };

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

  return (
    <div className="flex flex-col items-center overflow-x-hidden ">
      <div className="flex w-full ml-16 space-x-4 ">
        <div className="flex space-x-10 w-1/3  ">
          {" "}
          <FilterLanguage />
        </div>
        <div className="flex w-1/3 ">
          {" "}
          <FilterGenre />
        </div>
        <div className="flex  w-full space-x-2 ">
          <Input
            className="text-white w-1/2 flex-2"
            type="text"
            placeholder="Search for your favorite movies"
            onChange={changeTitle}
          />
          <Button
            className="bg-teal-100 hover:bg-lime-400 text-black "
            type="submit"
            onClick={handleSearchFilm}
          >
            Search
          </Button>
        </div>
      </div>
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
