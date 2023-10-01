import { film } from "@/app/type/film";
import { Card } from "@/registry/new-york/ui/card";
import { Rating } from "@mui/material";
import React from "react";

const MoviesDisplay = ({ films }: { films: film[] | undefined }) => {
  return (
    <div className="flex w-full mt-52">
      <h1 className="text-white font-extrabold w-auto m-5 ">Best movies</h1>
      <div className="flex w-full text-white relative overflow-x-auto">
        {films?.map((film: film) => (
          <Card
            className=" h-70 bg-teal-100 mr-2 flex flex-col justify-between text-black"
            key={film.id}
          >
            <div>
              <h1 className="w-full h-32 p-3">{film.title}</h1>
              <p className=" p-3"> {film.premiere}</p>
            </div>
            <Rating
              className="p-3"
              name="read-only"
              value={film.imdbScore}
              readOnly
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MoviesDisplay;
