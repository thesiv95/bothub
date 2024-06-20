import { Router } from "express";
import * as BooksController from "../controllers/booksController.js";
import { checkIfAdminMiddleware } from '../middlewares/auth.middlewares.js';

const booksRouter = Router();

booksRouter.use(checkIfAdminMiddleware);
booksRouter.post("/", BooksController.createBook);
booksRouter.get("/", BooksController.getBooks);
booksRouter.get("/:id", BooksController.getBook);
booksRouter.put("/:id", BooksController.updateBook);
booksRouter.delete("/:id", BooksController.deleteBook);

export default booksRouter;
