import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../../config.ts";

export interface AuthenticatedRequest extends Request {
  user?: { id: number; username: string };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const decodedToken = jwt.verify(
      authorization.substring(7),
      config.JWT_SECRET,
    ) as {
      id: number;
      username: string;
    };

    req.user = { id: decodedToken.id, username: decodedToken.username };
  } catch {
    return res.status(401).json({ error: "Not authenticated" });
  }
  return next();
};
