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
routerFilm.get("/language/:language", async (req: Request, res: Response) => {
  try {
    const films = await filmController.getFilmByLanguage(req.params.language);
    return res.status(200).json(films);
  } catch (error) {
    return res.status(500).json(error);
  }
});
routerFilm.get("/genre/:genre", async (req: Request, res: Response) => {
  try {
    const films = await filmController.getFilmsByGenre(req.params.genre);
    return res.status(200).json(films);
  } catch (error) {
    return res.status(500).json(error);
  }
});

routerFilm.get("/:title", async (req: Request, res: Response) => {
  try {
    const film = await filmController.getFilmByTitle(req.params.title);
    return res.status(200).json(film);
  } catch (error) {
    return res.status(500).json(error);
  }
});

routerFilm.post("/", async (req: Request, res: Response) => {
  try {
    const films = await filmController.addInformation();
    res.status(200).json(films);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default routerFilm;
