import { film } from "@/app/type/film";
import { Card } from "@/components/ui/card";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";

const MoviesDisplay = ({ films }: { films: film[] | undefined }) => {
  const router = useRouter();

  const handleClickFilm = async (title: string) => {
    router.push(`/films/${title}`);
  };

  return (
    <div className="flex w-full mt-52">
      <h1 className="text-white font-extrabold w-auto m-5 ">Best movies</h1>
      <div className="flex w-full text-white relative overflow-x-auto">
        {films?.map((film: film) => (
          <Card
            className="h-70 w-full bg-transparent mr-7 flex flex-col justify-between text-black  cursor-pointer border-none"
            key={film.id}
            onClick={() => handleClickFilm(film.title)}
          >
            <div className="flex h-full flex-col w-28 p-1  ">
              <div>
                <img
                  className="flex object-fill"
                  src={`https://image.tmdb.org/t/p/original/${film.poster}`}
                />
              </div>

              <p className="text-white p-3"> {film.premiere}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MoviesDisplay;
