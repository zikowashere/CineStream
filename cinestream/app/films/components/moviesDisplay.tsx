import { film } from "@/app/type/film";
import { Card } from "@/components/ui/card";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";

const MoviesDisplay = ({
  films,
  sectionTitle,
}: {
  films: film[] | undefined;
  sectionTitle: string;
}) => {
  const router = useRouter();

  const handleClickFilm = async (title: string) => {
    router.push(`/films/${title}`);
  };

  return (
    <div className="flex flex-col w-full p-1">
      <h1 className="text-white font-extrabold w-auto m-5 ">{sectionTitle}</h1>
      <div className="flex w-full text-white relative overflow-x-auto">
        {films?.map((film: film) => (
          <Card
            className="h-1/2 w-full bg-transparent mr-1 flex flex-col justify-between text-black  cursor-pointer border-none"
            key={film.title}
            onClick={() => handleClickFilm(film.title)}
          >
            <div className="flex  flex-col w-48 p-1  ">
              <div>
                <img
                  className="flex object-fill"
                  src={`https://image.tmdb.org/t/p/original/${film.poster}`}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MoviesDisplay;
