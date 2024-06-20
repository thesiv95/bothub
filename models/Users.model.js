import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import { UserRolesEnum } from '../consts.js';

const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    role:{
        type: DataTypes.ENUM,
        values: Object.values(UserRolesEnum),
    }

  },
  { timestamps: true }
);

export default Users;
