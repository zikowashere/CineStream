import nextAuth, { NextAuthOptions } from "next-auth";
import { optionAuth } from "../../../optionAuth/optionAuth";

const handler: NextAuthOptions = nextAuth(optionAuth);

export { handler as POST, handler as GET };
