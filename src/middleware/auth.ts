import { NextFunction, Request, Response } from "express";
import { APIError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";


const verifyJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        throw new APIError(401, "Unauthorized request");
      }

      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
      );
      const user = await prisma.user.findUnique({
        where: { id: (decodedToken as jwt.JwtPayload).userId },
        omit: { password: true },
      });
      if (!user) {
        throw new APIError(401, "Unauthorized request");
      }
      req.user = user;
      next();
    } catch (err) {
      if (err instanceof APIError) throw err;
      throw new APIError(401, "Invalid or expired access token");
    }
  },
);

export { verifyJWT };
