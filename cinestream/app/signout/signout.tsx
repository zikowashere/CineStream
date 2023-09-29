import { User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

interface Props {
  name: string | null | undefined;
}
export function SignOut({ name }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className=" bg-teal-100 rounded-lg w-52">
          {name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 m-1 ">
        <DropdownMenuItem className="ml-3  " onClick={() => signOut()}>
          <User className="mr-2 h-4 w-2" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
