export const useFetchFilmsByGenre = (genre: string) => {
  const fetchFilmsByGenre = async () => {
    try {
      const films = await fetch(`/api/films/genre/${genre}`);
      return films.json();
    } catch (error) {
      throw error;
    }
  };
  return { fetchFilmsByGenre };
};
