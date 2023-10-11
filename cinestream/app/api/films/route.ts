import { optionAuth } from "@/app/optionAuth/optionAuth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(optionAuth);
  const films = await axios.get(
    process.env.NEXT_PUBLIC_SERVER_URL + "/api/films",
    {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
        "Cache-Control": "max-age=360",
      },
    }
  );
  return NextResponse.json(films.data);
}
