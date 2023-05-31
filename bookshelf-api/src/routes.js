import {
  getBooks, addBook, deleteBook, getBookById, updateBook,
} from './handler.js';

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => 'Untuk memenuhi tugas submission bookshelf',
  },
  // Menampilkan Buku
  {
    method: 'GET',
    path: '/books',
    handler: getBooks,
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBook,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBook,
  },
];

export default routes;
