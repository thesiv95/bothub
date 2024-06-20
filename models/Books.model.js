import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import { GenresEnum } from "../consts.js";

const Books = sequelize.define(
  "books",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    genres: { 
      type: DataTypes.STRING,      
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default Books;
