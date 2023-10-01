import { film } from "../film/film";

export interface filmRepository {
  getFilmsByGenre(genre: string): Promise<film[] | null>;
  getFilmByTitle(title: string): Promise<film | null>;
  getFilms(): Promise<film[] | null>;
  getFilmsByLanguage(language: string): Promise<film[] | undefined | null>;
}
