import { film } from "../../films/film/film";
import { filmRepository } from "../../films/ports/filmRepository";
import prisma from "../prisma/client";

export default class FilmSqlRepository implements filmRepository {
  getFilmsByGenre(genre: string): Promise<film[] | null> {
    throw new Error("Method not implemented.");
  }
  getFilmByTitle(title: string): Promise<film | null> {
    throw new Error("Method not implemented.");
  }
  async getFilms() {
    try {
      return await prisma.film.findMany();
    } catch (error) {
      throw new Error("films doesn't exits.");
    }
  }
  getFilmsByLanguage(language: string): Promise<film[] | null> {
    throw new Error("Method not implemented.");
  }
}
