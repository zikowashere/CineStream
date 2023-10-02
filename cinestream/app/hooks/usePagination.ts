import { useMemo, useState } from "react";
import { film } from "../type/film";

interface Pagination {
  indexPage: number;
  filmPerPage: number;
  films: film[];
}
export const usePagination = () => {
  const PaginationPage = ({ indexPage, filmPerPage, films }: Pagination) => {
    try {
      const filmsPaginate = films.slice(indexPage, indexPage + filmPerPage);
      return filmsPaginate;
    } catch (error) {
      console.log("films doesn't exists");
    }
  };
  return { PaginationPage };
};
