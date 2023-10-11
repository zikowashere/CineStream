import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface UserPayload {
  user: {
    firstName: string;
    lastName: string;
  };
}

interface CustomRequest extends Request {
  user?: UserPayload;
}
export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const auth = req.header("Authorization");
  const token = auth?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }

  const decode = (token: string) =>
    jwt.verify(token, process.env.SECRET_TOKEN!) as UserPayload;

  try {
    req.user = decode(token);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token." });
  }
};
