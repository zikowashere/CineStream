"use client";
import { useFetchFilmsByGenre } from "@/app/hooks/films/useFetchFilmsByGenre";
import { usePagination } from "@/app/hooks/films/usePagination";
import { film } from "@/app/type/film";
import { Card } from "@/registry/new-york/ui/card";
import { Pagination } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  params: { genre: string };
}
const GenrePage = ({ params }: Props) => {
  const filmPerPage = 9;
  const router = useRouter();
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

  const handleClickFilm = (film: string) => {
    router.push(`/films/${film}`);
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
      throw new Error("Error; cannot get films :", error);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, [indexPage]);

  return (
    <>
      <div className=" grid  place-items-center grid-rows-3  grid-cols-3 gap-1 text-white overflow-x-hidden ">
        {filmsByGenre?.map((film) => (
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

export default GenrePage;
