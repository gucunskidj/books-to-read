CREATE DATABASE BooksToRead;

CREATE TABLE book(
  book_id SERIAL PRIMARY KEY,
  book_title VARCHAR(255),
  book_author VARCHAR(255),
  isbn VARCHAR(17),
  book_shop_link VARCHAR(2048)
);