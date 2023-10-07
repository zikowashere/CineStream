import { useCallback } from "react";

export const useFetchFilmsByLanguage = (language: string) => {
  const fetchFilmsByLanguage = useCallback(async () => {
    try {
      const films = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/films/language/${language}`
      );
      return films.json();
    } catch (error) {
      throw error;
    }
  }, []);
  return { fetchFilmsByLanguage };
};
