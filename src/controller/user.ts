import { Request, Response } from "express";
import * as UserService from "../service/user";
import { GetUserQuery, User } from "../interfaces/user";
import loggerWithNameSpace from "../utils/logger";
import HttpStatusCodes from "http-status-codes";
const logger = loggerWithNameSpace("UserController");
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
  logger.info("Called getUsers");
  res.status(HttpStatusCodes.OK).json(data);
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
  logger.info("Called getUserById");
  res.status(HttpStatusCodes.OK).json(data);
}
/**
 * Controller function to update user details by ID.
 * @param {Request} req - Express Request object containing user ID in req.params and updated user details in req.body.
 * @param {Response} res - Express Response object used to send JSON response.
 */
export function updateUser(
  req: Request<any, any, Partial<User>>,
  res: Response
) {
  const { id } = req.params;
  const updatedUserData = req.body;
  const updatedUser = UserService.updateUser(id, updatedUserData);

  if (updatedUser) {
    res.status(HttpStatusCodes.OK).json(updatedUser);
    logger.info("Called update user");
  } else {
    res
      .status(HttpStatusCodes.NOT_FOUND)
      .json({ error: `User with id ${id} not found` });
  }
}
/**
 * Controller function to delete user by ID.
 * @param {Request} req - Express Request object containing user ID in req.params.
 * @param {Response} res - Express Response object used to send JSON response.
 * @returns {void} - Returns nothing directly but sends JSON response.
 */
export function deleteUser(req: Request, res: Response): void {
  const { id } = req.params;

  const deleteResult = UserService.deleteUser(id);

  if (deleteResult) {
    res
      .status(HttpStatusCodes.OK)
      .json({ message: `User with id ${id} has been deleted` });
    logger.info("Called delete user");
  } else {
    res
      .status(HttpStatusCodes.NOT_FOUND)
      .json({ error: `User with id ${id} not found` });
  }
}
