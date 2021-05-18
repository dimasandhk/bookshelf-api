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

// Saya sengaja tambah _ sebelum kata request agar menghilangkan warning
const getAllBooksHandler = (_request, h) => {
  const response = h.response({
    status: "success",
    data: books
  });

  response.code(200);

  if (books || !books) {
    return response;
  }

  const hasGenericError = h.response({
    status: "error",
    message: "Buku gagal ditambahkan"
  });

  hasGenericError.code(500);
  return hasGenericError;
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const filteredBook = books.filter((book) => book.id === bookId)[0];

  if (filteredBook) {
    return {
      status: "success",
      data: { book: filteredBook }
    };
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan"
  });

  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const { payload } = request;
  const index = books.findIndex(({ id }) => id == bookId);

  if (index >= 0) {
    if (!payload.name) {
      const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku"
      });

      response.code(400);
      return response;
    }

    if (payload.readPage > payload.pageCount) {
      const response = h.response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
      });

      response.code(400);
      return response;
    }

    books[index] = {
      id: bookId,
      name: payload.name,
      year: payload.year,
      author: payload.author,
      summary: payload.summary,
      publisher: payload.publisher,
      pageCount: payload.pageCount,
      readPage: payload.readPage,
      finished: payload.pageCount == payload.readPage,
      reading: payload.reading,
      insertedAt: books[index].insertedAt,
      updatedAt: new Date().toISOString()
    };

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui"
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan"
  });

  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex(({ id }) => id == bookId);

  if (index >= 0) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus"
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan"
  });

  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler
};
