import express from "express";
import * as UsersService from "../services/usersService.js";
import * as MyResponse from "../utils/myResponse.js";
import { StatusCodesEnum } from "../consts.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const registerUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const newUser = await UsersService.registerUser({
      username,
      password,
      email,
    });

    return next(
      MyResponse.success(res, { user: newUser }, StatusCodesEnum.created)
    );
  } catch (error) {
    return next(MyResponse.error(res, error));
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const loginUser = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    const token = await UsersService.loginUser({ login, password });

    if (!token)
      return next(
        MyResponse.error(
          res,
          { message: "User or password incorrect" },
          StatusCodesEnum.accessDenied
        )
      );

    return next(MyResponse.success(res, { token }));
  } catch (error) {
    return next(MyResponse.error(res, error));
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const getUserInfo = async (req, res, next) => {
  try {
    const user = req.user; // from token
    const info = UsersService.getUserInfo(user);

    return next(MyResponse.success(res, { user: info }));
  } catch (error) {
    return next(MyResponse.error(res, error));
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const changeUserRole = async (req, res, next) => {
  try {
    let { id, role } = req.params;

    const roleValid = parseInt(role) === 0 || parseInt(role) === 1;
    if (!roleValid) throw new Error("Params are incorrect");

    const newToken = await UsersService.changeUserRole(id, role);
    if (!newToken) throw new Error("User error");

    return next(MyResponse.success(res, { changed: true, token: newToken }));
  } catch (error) {
    return next(MyResponse.error(res, error));
  }
};
