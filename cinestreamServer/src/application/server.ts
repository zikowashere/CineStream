import express from "express";
import routerFilm from "./router/film";
import cors from "cors";

const server = express();
const port = 5001;
server.use(cors());
server.use("/api/films", routerFilm);

server.listen(port, () => {
  console.log(`server is runing on port ${port}`);
});
