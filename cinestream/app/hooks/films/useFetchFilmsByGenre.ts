import { useCallback } from "react";

export const useFetchFilmsByGenre = (genre: string) => {
  const fetchFilmsByGenre = useCallback(async () => {
    try {
      const films = await fetch(`/api/films/genre/${genre}`);
      return films.json();
    } catch (error) {
      throw error;
    }
  }, []);
  return { fetchFilmsByGenre };
};
