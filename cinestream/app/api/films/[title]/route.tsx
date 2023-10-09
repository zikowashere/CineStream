import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { title: string } }
) {
  try {
    const film = await axios.get(
      process.env.NEXT_PUBLIC_SERVER_URL + `/api/films/${params.title}`
    );
    if (film.status === 200)
      return NextResponse.json(film.data, {
        headers: { "Cache-Control": "max-age=360" },
      });
  } catch (error) {
    throw error;
  }
}
