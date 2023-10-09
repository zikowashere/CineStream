import axios from "axios";
import { NextAuthOptions, RequestInternal } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { POST } from "../api/users/signup/route";
import { user } from "../type/user";

export const optionAuth: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Signup",
      credentials: {
        firstName: { label: "firstName", type: "text" },
        lastName: { label: "lastName", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const userResponse = await fetch(
            process.env.NEXT_PUBLIC_SERVER_URL + "/api/users/signup",
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Cache-Control": "max-age=360" },
            }
          );

          const token = userResponse.json();
          if (userResponse.status === 200) {
            return token;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {},
};
