"use client";
import { useFetchFilmsByLanguage } from "@/app/hooks/useFetchFilmsByLanguage";
import { film } from "@/app/type/film";
import React, { useEffect, useState } from "react";
import MoviesDisplay from "../../components/moviesDisplay";

interface Props {
  params: { language: string };
}
const page = ({ params }: Props) => {
  const [filmsByLanguage, setFilmsByLanguage] = useState<film[]>([]);
  const { fetchFilmsByLanguage } = useFetchFilmsByLanguage(params.language);

  useEffect(() => {
    fetchFilmsByLanguage.then((films) =>
      films ? setFilmsByLanguage(films) : undefined
    );
  });
  return (
    <div className="text-white">
      <MoviesDisplay films={filmsByLanguage} />
    </div>
  );
};

export default page;
