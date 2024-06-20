import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import { GenresEnum } from "../consts.js";

const Books = sequelize.define(
  "books",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    genres: {
      type: DataTypes.ENUM,
      values: Object.values(GenresEnum),
    },
  },
  { timestamps: true }
);

export default Books;
