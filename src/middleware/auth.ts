import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth";
import { verify } from "jsonwebtoken";
import config from "../config";
import { UnauthenticatedError } from "../error/UnauthenticateError";
import { User } from "../interfaces/user";
import { ROLE } from "../enums/role";

/**
 * Middleware function to authenticate requests using JWT.
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Express NextFunction to pass control to the next middleware.
 * @returns {void} - Returns nothing directly but calls next() or throws an Error.
 */
export function auth(req: Request, res: Response, next: NextFunction): void {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthenticatedError("Token not found"));
    return;
  }
  // Split the token and check format
  const token = authorization.split(" ");
  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new UnauthenticatedError("Unauthenticated"));
    return;
  }
  // Verify the JWT token
  try {
    const user = verify(token[1], config.jwt.secret!) as User;
    if (user.role !== ROLE.ADMIN) {
      next(new UnauthenticatedError("Unauthorized"));
    }

    req.user = user;
  } catch (error) {
    next(new UnauthenticatedError("Unauthenticated"));
  }
  next();
}
