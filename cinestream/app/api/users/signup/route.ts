import { user } from "@/app/type/user";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, user: user) {
  const users = await axios.post(
    process.env.NEXT_PUBLIC_SERVER_URL + "/api/users/signup",
    user,
    {
      headers: { "Cache-Control": "max-age=360" },
    }
  );
  return NextResponse.json(users.data);
}
