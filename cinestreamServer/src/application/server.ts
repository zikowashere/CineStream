import express from "express";
import routerFilm from "./router/film/film";
import cors from "cors";
import routerUser from "./router/user/user";

const server = express();
const port = 5001;
server.use(cors());
server.use(express.json());
server.use("/api/users", routerUser);
server.use("/api/films", routerFilm);

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
