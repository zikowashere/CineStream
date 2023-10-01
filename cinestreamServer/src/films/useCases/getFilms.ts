import { film } from "../film/film";
import { filmRepository } from "../ports/filmRepository";

export class getFilms {
  filmRepository: filmRepository;

  constructor(filmRepository: filmRepository) {
    this.filmRepository = filmRepository;
  }
  async getFilms() {
    return await this.filmRepository.getFilms();
  }
}
