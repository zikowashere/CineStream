import { useCallback } from "react";

export const useFetchFilmByTitle = (title: string) => {
  const fetchFilmByTitle = useCallback(async () => {
    try {
      const film = await fetch(`/api/films/${title}`);
      if (film.status == 200) return film.json();
    } catch (error) {
      throw error;
    }
  }, []);
  return { fetchFilmByTitle };
};
