import { film } from "../film/film";
import { filmRepository } from "../ports/filmRepository";

export class getFilmByTitle {
  filmRepository: filmRepository;

  constructor(filmRepository: filmRepository) {
    this.filmRepository = filmRepository;
  }
  async getFilmByTitle(title: string) {
    return await this.filmRepository.getFilmByTitle(title);
  }
}
