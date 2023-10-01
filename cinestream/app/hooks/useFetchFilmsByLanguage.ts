import { useMemo } from "react";

export const useFetchFilmsByLanguage = (language: string) => {
  const fetchFilmsByLanguage = useMemo(async () => {
    try {
      const films = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/films/language/${language}`
      );
      return films.json();
    } catch (error) {}
  }, []);
  return { fetchFilmsByLanguage };
};
