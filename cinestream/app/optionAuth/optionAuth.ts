import axios, { AxiosError } from "axios";
import jwt from "jsonwebtoken";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { decode } from "../type/decode";

export const optionAuth: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials, req) {
        try {
          const userResponse = await axios.post(
            process.env.NEXT_PUBLIC_SERVER_URL + "/api/users/signin",
            credentials,
            {
              headers: {
                "Cache-Control": "max-age=360",
                "Content-Type": "application/json",
              },
            }
          );
          const token = userResponse.data.token;
          const decoded = jwt.decode(token) as decode;
          const user = decoded?.user;

          if (user) {
            const shapedUser = {
              name: `${user.firstName} ${user.lastName}`,
              email: null,
              image: null,
            };

            return Promise.resolve({ ...shapedUser, token });
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            const axiosError = error as AxiosError;
            return Promise.reject(axiosError.response?.data);
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    session: async ({ session, token, user }) => {
      session.user = token as any;
      return Promise.resolve(session);
    },
  },
};
