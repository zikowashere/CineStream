import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { genre: string } }
) {
  const films = await axios.get(
    process.env.NEXT_PUBLIC_SERVER_URL + `/api/films/genre/${params.genre}`
  );
  return NextResponse.json(films.data, {
    headers: { "Cache-Control": "max-age=360" },
  });
}
