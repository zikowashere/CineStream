import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

interface Props {
  name: string | null | undefined;
}
export function SignOut({ name }: Props) {
  const callback = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-full flex justify-end">
          <Button
            variant="outline"
            className=" bg-teal-100 rounded-3xl  hover:bg-lime-400 text-black"
          >
            {name}
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 m-1 ">
        <DropdownMenuItem
          className="ml-3 rounded-3xl "
          onClick={() => signOut({ callbackUrl: callback })}
        >
          <User className="mr-2 h-4 w-2" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
