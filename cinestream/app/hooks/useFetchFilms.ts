import { useCallback } from "react";

export const useFetchFilms = () => {
  const fetchFilms = useCallback(async () => {
    try {
      const films = await fetch("/api/films");
      return films.json();
    } catch (error) {
      throw error;
    }
  }, []);

  return { fetchFilms };
};
