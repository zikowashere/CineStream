import { filmRepository } from "../ports/filmRepository";

export class getFilmsByGenre {
  filmRepository: filmRepository;

  constructor(filmRepository: filmRepository) {
    this.filmRepository = filmRepository;
  }

  async getFilmsByGenre(genre: string) {
    return await this.filmRepository.getFilmsByGenre(genre);
  }
}
