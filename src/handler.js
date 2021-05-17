const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
  const { payload } = request;

  if (!payload.name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku"
    });

    response.code(400);
    return response;
  }

  if (payload.readPage > payload.pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    });

    response.code(400);
    return response;
  }

  const newDate = new Date().toISOString();
  const newBook = {
    id: nanoid(16),
    name: payload.name,
    year: payload.year,
    author: payload.author,
    summary: payload.summary,
    publisher: payload.publisher,
    pageCount: payload.pageCount,
    readPage: payload.readPage,
    finished: payload.pageCount == payload.readPage,
    reading: payload.reading,
    insertedAt: newDate,
    updatedAt: newDate
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id == newBook.id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: newBook.id
      }
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: "error",
    message: "Buku gagal ditambahkan"
  });

  response.code(500);
  return response;
};

module.exports = {
  addBookHandler
};
