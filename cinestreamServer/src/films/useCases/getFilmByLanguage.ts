import { filmRepository } from "../ports/filmRepository";

export class getFilmsByLanguage {
  filmRepository: filmRepository;

  constructor(filmRepository: filmRepository) {
    this.filmRepository = filmRepository;
  }
  async getFilmsByLanguage(language: string) {
    return await this.filmRepository.getFilmsByLanguage(language);
  }
}
