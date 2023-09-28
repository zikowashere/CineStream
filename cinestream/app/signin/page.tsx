import { Metadata } from "next";

import { cn } from "@/lib/utils";

import { DemoCreateAccount } from "./components/create-account";

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
          <DemoCreateAccount />
        </DemoContainer>
      </div>
    </div>
  );
}
