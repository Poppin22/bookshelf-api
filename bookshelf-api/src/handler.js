import { nanoid } from 'nanoid';
import books from './book.js';

// Menampilkan Buku
const getBooks = async (request, h) => {
  const { name, reading, finished } = request.query;

  let listBooks = books;

  if (name) {
    listBooks = books.filter((book) => {
      const lowercaseName = book.name.toLowerCase();
      const lowercaseSearchTerm = name.toLowerCase();
      return lowercaseName.includes(lowercaseSearchTerm);
    });
  }

  if (reading !== undefined) {
    listBooks = books.filter(
      (book) => Number(book.reading) === Number(reading),
    );
  }

  if (finished !== undefined) {
    listBooks = books.filter(
      (book) => Number(book.finished) === Number(finished),
    );
  }

  const response = h.response({
    status: 'success',
    data: {
      books: listBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });

  response.code(200);
  return response;
};

const addBook = async (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  //   Ketika User Tidak Menuliskan Nama
  if (!name) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    res.code(400);
    return res;
  }
  if (readPage > pageCount) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    res.code(400);
    return res;
  }

  const insertBook = {
    id: nanoid(16),
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: pageCount === readPage,
    insertedAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    reading,
  };
  books.push(insertBook);

  const isInserted = books.filter((book) => book.id === insertBook.id).length;

  if (isInserted) {
    const res = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: insertBook.id,
      },
    });
    res.code(201);
    return res;
  }
  const res = h.response({
    status: 'fail',
    message: 'Gagal menambahkan buku',
  });
  res.code(500);
  return res;
};
const deleteBook = async (request, h) => {
  const { bookId } = request.params;

  const indexBook = books.findIndex((book) => book.id === bookId);

  if (indexBook !== -1) {
    books.splice(indexBook, 1);
    const res = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    res.code(200);
    return res;
  }
  const res = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  res.code(404);
  return res;
};
const getBookById = async (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((data) => data.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      message: 'Berhasil menampilkan buku',
      data: {
        book,
      },
    };
  }
  const res = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  res.code(404);
  return res;
};
const updateBook = async (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const { bookId } = request.params;
  const updatedAt = new Date().toISOString();
  const indexBook = books.findIndex((book) => book.id === bookId);

  if (!name) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    res.code(400);
    return res;
  }
  if (readPage > pageCount) {
    const res = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    res.code(400);
    return res;
  }
  if (indexBook !== -1) {
    books[indexBook] = {
      ...books[indexBook],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished: pageCount === readPage,
      reading,
      updatedAt,
    };
    const res = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    res.code(200);
    return res;
  }
  const res = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  res.code(404);
  return res;
};
export {
  getBooks, addBook, deleteBook, getBookById, updateBook,
};
