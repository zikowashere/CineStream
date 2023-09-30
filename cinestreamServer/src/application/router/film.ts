import express, { Request, Response } from "express";
import FilmController from "../controller/filmController";
import FilmSqlRepository from "../repository/filmSqlRepository";

const routerFilm = express.Router();
const filmSqlRepository = new FilmSqlRepository();
const filmController = new FilmController(filmSqlRepository);

routerFilm.get("/", async (req: Request, res: Response) => {
  try {
    const films = await filmController.getFilms();
    return res.status(200).json(films);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default routerFilm;
