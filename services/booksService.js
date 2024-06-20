import Books from "../models/Books.model.js";

export const createBook = async (newBook) => {
  return Books.create(newBook);
};

export const getBooks = async (page, limit) => {
  return Books.findAll({
    limit: parseInt(limit),
    offset: (page - 1) * parseInt(limit),
  });
};

export const getBook = async (id) => {
  return Books.findByPk(id);
};

export const updateBook = async (id, newBook) => {
  return Books.update(newBook, { where: { id } });
};

export const deleteBook = async (id) => {
  // {force: true} triggers DELETE sql command
  return Books.destroy({ where: { id }, force: true });
};
