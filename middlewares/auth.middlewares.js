import express from "express";
import jwt from "jsonwebtoken";
import { StatusCodes, UserRolesEnum } from "../consts.js";
import config from "../config.js";

const { JWT_KEY } = config;

const getJWTToken = (authHeader) => {
  const [type, token] = authHeader.split(" "); // Bearer ...
  if (type !== "Bearer") return null;

  return token;
};

/**
 * Check if role is admin
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const checkIfAdminMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers["Authorization"];
    const token = getJWTToken(authHeader);
    if (!token) throw new Error();

    const decodedUser = jwt.verify(token, JWT_KEY);
    
    if (decodedUser.role === UserRolesEnum.Admin) {
      next();
    } else {
      throw new Error();
    }

  } catch (error) {
    console.error("checkIfAdminMiddleware", error);
    return res.status(StatusCodes.accessDenied).send({ error: "Sorry, check your privileges" });
  }
};

/**
 * Get user
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const authUserMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers["Authorization"];
    const token = getJWTToken(authHeader);
    if (!token) throw new Error();

    const decodedUser = jwt.verify(token, JWT_KEY);

    req.user = decodedUser; // id, username, email, role

    next();
  } catch (error) {
    console.error("authMiddleware", error);
    return res.status(StatusCodes.unauthorized).send({ error: "Unauthorized!" });
  }
};


