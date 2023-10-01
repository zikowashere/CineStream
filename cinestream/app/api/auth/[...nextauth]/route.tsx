import nextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import { optionAuth } from "../../../optionAuth/optionAuth";

const handler = nextAuth(optionAuth);

export { handler as GET, handler as POST };
