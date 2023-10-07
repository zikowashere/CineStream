"use client";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { split } from "postcss/lib/list";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { useFetchFilms } from "../hooks/useFetchFilms";
import { useGetInformationFilm } from "../hooks/useGetInformationsFilm";
import { film } from "../type/film";
import FilterGenre from "./components/filterGenre";
import FilterLanguage from "./components/filterLanguage";
import MoviesDisplay from "./components/moviesDisplay";

function FilmsPage() {
  const router = useRouter();
  const [posterFilm, setPosterFilm] = useState<string>("");
  const [films, setFilms] = useState<film[] | undefined>([]);
  const [trendingFilm, setTrendingFilm] = useState<film[]>([]);
  const [title, setTitle] = useState("");

  const { fetchFilms } = useFetchFilms();
  const { getInformationFilm } = useGetInformationFilm();

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleSearchFilm = () => {
    if (title !== "") router.push(`/films/${title}`);
  };

  const getInfo = async (title: string) => {
    const information = await getInformationFilm(title);
    return information.results[0].poster_path;
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
    <div className="flex flex-col  items-center overflow-x-auto ">
      <div className="flex w-full ml-16 space-x-4 ">
        <div className="flex space-x-10 w-1/3 ">
          {" "}
          <FilterLanguage />
        </div>
        <div className="flex w-1/3 ">
          {" "}
          <FilterGenre />
        </div>
        <div className="flex  w-full space-x-2 ">
          <Input
            className="text-white w-1/2"
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
      <div className=" flex  flex-coljustify-center w-full p-5">
        {/* <Suspense
          fallback={<CircularProgress className=" flex " color="secondary" />}
        >
          <MoviesDisplay films={films} />
        </Suspense> */}
        <Suspense
          fallback={<CircularProgress className=" flex " color="secondary" />}
        >
          <MoviesDisplay films={trendingFilm} />
        </Suspense>
      </div>
    </div>
  );
}

export default FilmsPage;
