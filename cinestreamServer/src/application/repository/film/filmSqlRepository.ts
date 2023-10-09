import axios from "axios";
import { film } from "../../../films/film/film";
import { filmRepository } from "../../../films/ports/filmRepository";
import prisma from "../../prisma/film/client";

export default class FilmSqlRepository implements filmRepository {
  async addInformation() {
    try {
      const films: film[] = await prisma.film.findMany();
      let information;
      for (const film of films) {
        information = await axios.get(
          process.env.TMDB_BASE_URL +
            `query=${film.title}&api_key=` +
            process.env.TMDB_CLIENT
        );
        const res = information.data.results[0];

        if (
          res.poster_path !== null ||
          res.backdrop_path !== null ||
          res.poster_path !== undefined ||
          res.backdrop_path !== undefined ||
          res !== null ||
          res !== undefined
        ) {
          await prisma.film.update({
            where: { id: film.id },
            data: {
              poster: res.poster_path,
              posterCard: res.backdrop_path,
            },
          });
        } else {
          await prisma.film.delete({ where: { id: film.id } });
        }
      }
    } catch (error) {
      console.log("error", error);
      throw new Error("films doesn't exists.");
    }
  }
  async getFilmsByGenre(genre: string): Promise<film[] | null> {
    try {
      const films = await prisma.film.findMany({ where: { genre: genre } });
      return films;
    } catch (error) {
      throw new Error("films doesn't exists.");
    }
  }
  async getFilmByTitle(title: string) {
    try {
      const film = await prisma.film.findFirstOrThrow({
        where: { title: title },
      });
      if (film) return film;
      else return null;
    } catch (error) {
      throw new Error("films doesn't exists.");
    }
  }
  async getFilms() {
    try {
      return await prisma.film.findMany();
    } catch (error) {
      throw new Error("films doesn't exits.");
    }
  }
  async getFilmsByLanguage(language: string) {
    try {
      const films = await prisma.film.findMany({
        where: { language: language },
      });
      if (films) return films;
      else return null;
    } catch (error) {}
  }
}
