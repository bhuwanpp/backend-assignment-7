import { Request, Response } from "express";
import * as authService from "../service/auth";
import config from "../config";
import { sign, verify } from "jsonwebtoken";

/**
 * Controller function to handle user signup.
 * @param {Request} req - Express Request object containing user information in req.body.
 * @param {Response} res - Express Response object used to send JSON response.
 */
export async function signup(req: Request, res: Response) {
  const { body } = req;
  const data = await authService.signup(body);
  if (data) {
    res.json({
      message: "user created ",
      ...body,
    });
  } else {
    res.json({
      message: "user already exist",
    });
  }
}

/**
 * Controller function to handle user login.
 * @param {Request} req - Express Request object containing user credentials in req.body.
 * @param {Response} res - Express Response object used to send JSON response.
 */
export async function login(req: Request, res: Response) {
  const { body } = req;
  const data = await authService.login(body);
  res.json(data);
}

/**
 * Refreshes the access token using the provided refresh token.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
export async function refresh(req: Request, res: Response) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(404).json({
      error: "Invalid token",
    });
    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    res.status(404).json({
      error: "Invalid method",
    });
    return;
  }

  verify(token[1], config.jwt.secret!, (error, data) => {
    if (error) {
      res.status(404).json({
        error: error.message,
      });
    }

    if (typeof data !== "string" && data) {
      const payload = {
        id: data.id,
        name: data.name,
        email: data.email,
      };
      const accessToken = sign(payload, config.jwt.secret!);
      const refreshToken = token[1];

      res.status(200).json({
        accessToken,
        refreshToken,
      });
    }
  });
}
