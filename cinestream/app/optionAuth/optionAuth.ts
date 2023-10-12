import axios, { AxiosError } from "axios";
import { Session } from "inspector";
import jwt from "jsonwebtoken";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { decode } from "../type/decode";
import { user } from "../type/user";

type User = {
  id: string;
  name: string;
  email: string | null;
  image: string | null;
  token: string;
};

export const optionAuth: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        firstName: {
          label: "firstName",
          type: "text",
          placeholder: "first name",
        },
        lastName: { label: "lastName", type: "text", placeholder: "last name" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
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
          if (!userResponse) return null;
          const token = userResponse.data.token;
          const decoded = jwt.decode(token) as decode;
          const user = decoded?.user;

          if (user) {
            const shapedUser: User = {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              email: null,
              image: null,
              token: token,
            };

            return Promise.resolve<User>(shapedUser);
          }
          return null;
        } catch (error) {
          if (error instanceof AxiosError) {
            const axiosError = error as AxiosError;
            return Promise.reject(axiosError.response?.data);
          }
        }
        return null;
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
