"use client";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useFetchFilms } from "../hooks/useFetchFilms";
import { film } from "../type/film";
import FilterLanguage from "./components/filterLanguage";
import MoviesDisplay from "./components/moviesDisplay";

function FilmsPage() {
  const [films, setFilms] = useState<film[] | undefined>([]);

  const { fetchFilms } = useFetchFilms();

  useEffect(() => {
    fetchFilms.then((films) => setFilms(films));
  }, []);
  return (
    <div className="flex flex-col items-center overflow-x-auto m-40">
      <div className="flex w-full  ">
        <div className="flex w-full max-w-sm m-5 ">
          {" "}
          <FilterLanguage />
        </div>
        <div className="flex w-full max-w-sm m-5 space-x-2">
          <Input type="text" placeholder="Search for your favorite movies" />
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

      <div className="flex justify-center w-full">
        <Pagination
          className="bg-teal-100 m-10 rounded-2xl absolute bottom-0"
          count={10}
        />
      </div>
    </div>
  );
}

export default FilmsPage;
