import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import { GetUserQuery, User } from "../interfaces/user";
import * as UserService from "../service/user";
import loggerWithNameSpace from "../utils/logger";
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
  const { body } = req;
  const data = UserService.getUsers(body);
  logger.info("Called getUsers");
  res.status(HttpStatusCodes.OK).json(data);
}

/**
 * Controller function to get user details by ID.
 * @param {Request} req - Express Request object containing user ID in req.params.
 * @param {Response} res - Express Response object used to send JSON response.
 * @param {next} next - Express nextfunction object
 * @returns {void} - Returns nothing directly but sends JSON response.
 */
export function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const { id } = req.params;
    const data = UserService.getUserById(id);
    logger.info("Called getUserById");
    res.status(HttpStatusCodes.OK).json(data);
  } catch (e) {
    next(e);
  }
}
/**
 * Controller function to update user details by ID.
 * @param {Request} req - Express Request object containing user ID in req.params and updated user details in req.body.
 * @param {Response} res - Express Response object used to send JSON response.
 * @param {next} next - Express nextfunction object
 */
export function updateUser(
  req: Request<any, any, Partial<User>>,
  res: Response,
  next: NextFunction
) {
  try {
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
  } catch (e) {
    next(e);
  }
}
/**
 * Controller function to delete user by ID.
 * @param {Request} req - Express Request object containing user ID in req.params.
 * @param {Response} res - Express Response object used to send JSON response.
 * @param {next} next - Express nextfunction object
 * @returns {void} - Returns nothing directly but sends JSON response.
 */
export function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
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
  } catch (e) {
    next(e);
  }
}
