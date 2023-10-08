"use client";
import { Button } from "@/components/ui/button";
import { Alert } from "@mui/material";
import { useRouter } from "next/navigation";

import React from "react";

const NotFound = () => {
  const router = useRouter();
  const getToHomePage = () => {
    router.back();
  };
  return (
    <div className="flex justify-center items-center">
      <Alert onClose={getToHomePage} severity="error">
        This route is not defined - please verify your routes!
      </Alert>
    </div>
  );
};

export default NotFound;
