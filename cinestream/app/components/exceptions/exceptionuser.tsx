"use client";
import { Alert, Collapse } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ExceptionUser = ({ message }: { message: string }) => {
  const router = useRouter();
  const callbackUrl = window.location.href;
  const [open, setOpen] = useState(true);

  const getToHomePage = () => {
    setOpen(false);
    router.push(callbackUrl);
  };
  return (
    <div className="flex justify-center items-center">
      <Collapse in={open}>
        <Alert onClose={getToHomePage} severity="error">
          {message}
        </Alert>
      </Collapse>
    </div>
  );
};

export default ExceptionUser;
