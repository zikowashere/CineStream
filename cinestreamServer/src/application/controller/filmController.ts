import { filmRepository } from "../../films/ports/filmRepository";
import { addInformation } from "../../films/useCases/addInformations";
import { getFilmsByLanguage } from "../../films/useCases/getFilmByLanguage";
import { getFilmByTitle } from "../../films/useCases/getFilmByTitle";
import { getFilms } from "../../films/useCases/getFilms";
import { getFilmsByGenre } from "../../films/useCases/getFilmsByGenre";

export default class FilmController {
  filmRepository: filmRepository;

  constructor(filmRepository: filmRepository) {
    this.filmRepository = filmRepository;
  }

  async getFilmByLanguage(language: string) {
    const films = new getFilmsByLanguage(this.filmRepository);
    return await films.getFilmsByLanguage(language);
  }

  async getFilmByTitle(title: string) {
    const film = new getFilmByTitle(this.filmRepository);
    return await film.getFilmByTitle(title);
  }

  async getFilmsByGenre(genre: string) {
    const films = new getFilmsByGenre(this.filmRepository);
    return await films.getFilmsByGenre(genre);
  }

  async getFilms() {
    const films = new getFilms(this.filmRepository);
    return await films.getFilms();
  }
  async addInformation() {
    const films = new addInformation(this.filmRepository);
    return await films.addInformation();
  }
}
