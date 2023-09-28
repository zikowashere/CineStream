"use client";

import { Icons } from "@/components/Icons";
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
import { signIn } from "next-auth/react";
import { Suspense } from "react";

export function DemoCreateAccount() {
  const callbackUrl = "http://localhost:3000/";

  const handleSignIn = async () => {
    const result = await signIn("google", {
      callbackUrl: callbackUrl,
    });

    if (!result) {
      console.error("Erreur to signIn");
    }
  };
  return (
    <Card className="bg-black justify-center items-center">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-slate-50">
          Create an account
        </CardTitle>
        <CardDescription className="text-slate-50">
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="ghost" className=" bg-lime-400  hover:bg-green-300 ">
            <Icons.twitter className="mr-2 h-4 w-4" />
            Twitter
          </Button>
          <Button
            onClick={handleSignIn}
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
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-lime-400  hover:bg-green-300">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
