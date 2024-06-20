import { Router } from "express";
import * as BooksController from "../controllers/booksController.js";

const booksRouter = Router();

booksRouter.post("/", BooksController.createBook);
booksRouter.get("/", BooksController.getBooks);
booksRouter.get("/:id", BooksController.getBook);
booksRouter.put("/:id", BooksController.updateBook);
booksRouter.delete("/:id", BooksController.deleteBook);

export default booksRouter;
