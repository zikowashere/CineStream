"use client";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useFetchFilms } from "../hooks/useFetchFilms";
import { film } from "../type/film";
import FilterGenre from "./components/filterGenre";
import FilterLanguage from "./components/filterLanguage";
import MoviesDisplay from "./components/moviesDisplay";

function FilmsPage() {
  const [films, setFilms] = useState<film[] | undefined>([]);

  const { fetchFilms } = useFetchFilms();

  useEffect(() => {
    fetchFilms.then((films) => setFilms(films));
  }, []);

  return (
    <div className="flex flex-col  items-center overflow-x-auto ">
      <div className="flex w-1/2 justify-center  space-x-10 ">
        <div className="flex w-1/3 ">
          {" "}
          <FilterLanguage />
        </div>
        <div className="flex w-1/3 ">
          {" "}
          <FilterGenre />
        </div>
        <div className="flex  w-1/2  space-x-2">
          <Input
            className="text-white"
            type="text"
            placeholder="Search for your favorite movies"
          />
          <Button
            className="bg-teal-100 hover:bg-lime-400 text-black "
            type="submit"
          >
            Search
          </Button>
        </div>
      </div>
      <div className="w-full">
        <MoviesDisplay films={films} />
      </div>
    </div>
  );
}

export default FilmsPage;
