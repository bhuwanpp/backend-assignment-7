import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";

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
    next(new Error("Unauthenticated"));
    return;
  }
  // Split the token and check format
  const token = authorization.split(" ");
  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new Error("Unauthenticated"));
    return;
  }
  // Verify the JWT token
  verify(token[1], config.jwt.secret!);
  next();
}
