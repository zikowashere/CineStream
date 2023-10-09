import { user } from "@/app/type/user";
import axios from "axios";
import { NextResponse } from "next/server";

export const useSignUp = () => {
  const signUpUser = async (userToSignup: user) => {
    try {
      const user = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL + "/api/users/signup",
        userToSignup,
        {
          headers: { "Cache-Control": "max-age=360" },
        }
      );
      return NextResponse.json(user.data);
    } catch (error) {
      throw error;
    }
  };
  return { signUpUser };
};
