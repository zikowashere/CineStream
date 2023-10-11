import express from "express";
import routerFilm from "./router/film/film";
import cors from "cors";
import routerUser from "./router/user/user";
import { verifyToken } from "./middleware/validationToken";

const server = express();
const port = 5001;
server.use(cors());
server.use(express.json());
server.use("/api/users", routerUser);
server.use("/api/films", verifyToken, routerFilm);

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
