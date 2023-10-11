import { optionAuth } from "@/app/optionAuth/optionAuth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { title: string } }
) {
  const session = await getServerSession(optionAuth);
  try {
    const film = await axios.get(
      process.env.NEXT_PUBLIC_SERVER_URL + `/api/films/${params.title}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
          "Cache-Control": "max-age=360",
        },
      }
    );
    if (film.status === 200) return NextResponse.json(film.data);
  } catch (error) {
    throw error;
  }
}
