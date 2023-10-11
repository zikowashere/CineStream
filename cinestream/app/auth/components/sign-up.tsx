"use client";

import ExceptionUser from "@/app/components/exceptions/exceptionuser";
import { useSignUp } from "@/app/hooks/users/useSignUp";
import { user } from "@/app/type/user";
import { Icons } from "@/components/icons";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export function SignUpAccount({
  titleSection,
  cardDescription,
  buttonDescription,
}: {
  titleSection: string;
  cardDescription: string;
  buttonDescription: string;
}) {
  const router = useRouter();
  const callbackUrl = process.env.NEXT_PUBLIC_BASE_URL + "/films";
  const [user, setUser] = useState<user>();
  const [error, setError] = useState<string>();
  const { signUpUser } = useSignUp();

  const changeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser({ ...user!, firstName: e.target.value });
  };

  const changeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser({ ...user!, lastName: e.target.value });
  };

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser({ ...user!, password: e.target.value });
  };

  const handleSignInGoogle = async () => {
    const result = await signIn("google", {
      callbackUrl: callbackUrl,
    });

    if (!result) {
      throw new Error("Error to signIn");
    }
  };

  const handleSignUp = async () => {
    try {
      const userSignIn = await (await signUpUser(user!)).json();
      if (userSignIn) router.push("/auth/signin");
    } catch (error) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
    }
  };

  useEffect(() => {}, [user]);

  return (
    <Card className="bg-black justify-center items-center border-lime-400 ">
      {error && <ExceptionUser message={error} />}
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-slate-50">{titleSection}</CardTitle>
        <CardDescription className="text-slate-50 ">
          {cardDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="ghost" className=" bg-lime-400  hover:bg-green-300 ">
            <Icons.twitter className="mr-2 h-4 w-4" />
            Twitter
          </Button>
          <Button
            onClick={handleSignInGoogle}
            variant="ghost"
            className="bg-lime-400  hover:bg-green-300"
          >
            <Icons.google className="mr-2 h-4 w-4 " />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background  text-black px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label className="text-white" htmlFor="email">
            firstName
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Enter your first Name"
            onChange={changeFirstName}
          />
        </div>
        <div className="grid gap-2">
          <Label className="text-white" htmlFor="email">
            lastName
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Enter your last Name"
            onChange={changeLastName}
          />
        </div>
        <div className="grid gap-2">
          <Label className="text-white" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            onChange={changePassword}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-lime-400  hover:bg-green-300 text-black"
          onClick={handleSignUp}
        >
          {buttonDescription}
        </Button>
      </CardFooter>
    </Card>
  );
}
