import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const films = await axios.get(process.env.SERVER_URL + "/api/films", {
    headers: { "Cache-Control": "max-age=360" },
  });
  return NextResponse.json(films.data);
}
