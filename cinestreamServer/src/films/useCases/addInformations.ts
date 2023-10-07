import { filmRepository } from "../ports/filmRepository";

export class addInformation {
  filmRepository: filmRepository;

  constructor(filmRepository: filmRepository) {
    this.filmRepository = filmRepository;
  }
  async addInformation() {
    return await this.filmRepository.addInformation();
  }
}
