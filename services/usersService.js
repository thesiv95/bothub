import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";
import Users from "../models/Users.model.js";
import { UserRolesEnum } from "../consts.js";

const { BCRYPT_SALT_INDEX, JWT_KEY, JWT_EXPIRES_IN_MINS } = config;

const jwtSign = (user) =>
  jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    JWT_KEY,
    { expiresIn: `${JWT_EXPIRES_IN_MINS}m` }
  );

export const registerUser = async ({ username, password, email }) => {
  const passwordEncrypted = await bcrypt.hash(password, +BCRYPT_SALT_INDEX);
  const newUser = {
    username,
    password: passwordEncrypted,
    email,
    role: UserRolesEnum.Manager,
  };
  return Users.create(newUser);
};

export const loginUser = async ({ login, password }) => {
  // check if user exists?
  const user = await Users.findOne({ where: login });
  if (!user) return null;

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) return null;

  return jwtSign(user);
};

export const getUserInfo = (user) => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};

/** Changes role and returns updated token for the user */
export const changeUserRole = async (id, role) => {
  // check if user exists
  const user = await Users.findByPk(id);
  if (!user) return null;

  const newRole =
    parseInt(role) === 1 ? UserRolesEnum.Admin : UserRolesEnum.Manager;

  await Users.update(
    {
      role: newRole,
    },
    { where: { id: user.id } }
  );

  const newUser = {
    role: newRole,
    id: user.id,
    username: user.username,
    email: user.email,
  };

  return jwtSign(newUser);
};
