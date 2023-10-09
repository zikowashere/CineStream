import { Metadata } from "next";

import { cn } from "@/lib/utils";

import { SignIn } from "../components/sign-in";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to account.",
};

function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  );
}

export default function CardsPage() {
  return (
    <div className=" flex m-20 relative items-center justify-center">
      <div className="col-span-4 md:col-span-2 lg:col-span-2  ">
        <DemoContainer>
          <div className="flex w-1/2">
            <SignIn
              titleSection={"log In to your account"}
              cardDescription={
                "Welcome back! Log in to your account and continue your journey with CineStream. "
              }
              buttonDescription={"Login"}
            />
          </div>
        </DemoContainer>
      </div>
    </div>
  );
}
