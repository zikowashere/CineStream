import { useCallback, useMemo, useState } from "react";
import { film } from "../../type/film";

interface Pagination {
  indexPage: number;
  filmPerPage: number;
  films: film[];
}
export const usePagination = () => {
  const PaginationPage = useCallback(
    ({ indexPage, filmPerPage, films }: Pagination) => {
      try {
        const filmsPaginate = films.slice(indexPage, indexPage + filmPerPage);
        return filmsPaginate;
      } catch (error) {
        throw error;
      }
    },
    []
  );
  return { PaginationPage };
};
