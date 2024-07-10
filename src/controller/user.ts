import { Request, Response } from "express";
import * as UserService from "../service/user";
import { GetUserQuery } from "../interfaces/user";

/**
 * Controller function to get users based on query parameters.
 * @param {Request<any, any, any, GetUserQuery>} req - Express Request object containing query parameters in req.query.
 * @param {Response} res - Express Response object used to send JSON response.
 * @returns {void} - Returns nothing directly but sends JSON response.
 */
export function getUsers(
  req: Request<any, any, any, GetUserQuery>,
  res: Response
): void {
  const { query } = req;
  const data = UserService.getUsers(query);
  res.json(data);
}

/**
 * Controller function to get user details by ID.
 * @param {Request} req - Express Request object containing user ID in req.params.
 * @param {Response} res - Express Response object used to send JSON response.
 * @returns {void} - Returns nothing directly but sends JSON response.
 */
export function getUseerById(req: Request, res: Response): void {
  const { id } = req.params;
  const data = UserService.getUseerById(id);
  res.json(data);
}
