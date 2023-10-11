"use client";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";

const ExceptionFilm = ({ message }: { message: string }) => {
  const router = useRouter();
  const getToHomePage = () => {
    router.push("/films");
  };
  return (
    <div className="flex justify-center items-center">
      <Alert onClose={getToHomePage} severity="error">
        {message}
      </Alert>
    </div>
  );
};

export default ExceptionFilm;
