import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { language: string } }
) {
  const films = await axios.get(
    process.env.SERVER_URL + `/api/films/language/${params.language}`
  );
  return NextResponse.json(films.data);
}
