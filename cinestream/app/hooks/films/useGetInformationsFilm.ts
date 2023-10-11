import axios from "axios";
import { useCallback } from "react";

export const useGetInformationFilm = () => {
  const getInformationFilm = useCallback(async (title: string) => {
    const film = await axios.get(
      process.env.NEXT_PUBLIC_TMDB_BASE_URL +
        `query=${title}&api_key=` +
        process.env.NEXT_PUBLIC_TMDB_CLIENT
    );
    return film.data;
  }, []);
  return { getInformationFilm };
};
