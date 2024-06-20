import express from "express";
import * as BooksService from "../services/booksService.js";
import * as MyResponse from "../utils/myResponse.js";
import { GenresEnum, StatusCodesEnum } from "../consts.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const createBook = async (req, res, next) => {
  try {
    const { title, author, publicationDate, genres } = req.body;

    const newBook = await BooksService.createBook({
      title,
      author,
      publicationDate,
      genres,
    });

    if (!Object.values(GenresEnum).includes(genres)) {
      throw new Error("Incompatible genre type");
    }

    return next(
      MyResponse.success(res, { book: newBook }, StatusCodesEnum.created)
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
export const getBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const books = await BooksService.getBooks(page, limit);

    return next(MyResponse.success(res, { books }));
  } catch (error) {
    return next(MyResponse.error(res, error));
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const getBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await BooksService.getBook(id);

    return next(MyResponse.success(res, { book }));
  } catch (error) {
    return next(MyResponse.error(res, error));
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, author, publicationDate, genres } = req.body;

    await BooksService.updateBook(id, {
      title,
      author,
      publicationDate,
      genres,
    });

    return next(
      MyResponse.success(res, { title, author, publicationDate, genres })
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
export const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    await BooksService.deleteBook(id);

    return next(MyResponse.success(res, null, StatusCodesEnum.deleted));
  } catch (error) {
    return next(MyResponse.error(res, error));
  }
};
