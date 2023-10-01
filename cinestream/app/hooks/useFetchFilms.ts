import { useMemo } from "react";

export const useFetchFilms = () => {
  const fetchFilms = useMemo(async () => {
    try {
      const response = await fetch("/api/films");
      return response.json();
    } catch (error) {
      console.error("Error cannot get films :", error);
    }
  }, []);

  return { fetchFilms };
};
