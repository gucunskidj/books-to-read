const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// middlewares
app.use(cors());
app.use(express.json());

// ROUTES

// add new book
app.post('/books', async (req, res) => {
	try {
		const { book_title, book_author, isbn, book_shop_link } = req.body;
		const newBook = await pool.query(
			'INSERT INTO book (book_title, book_author, isbn, book_shop_link) VALUES ($1, $2, $3, $4) RETURNING *',
			[book_title, book_author, isbn, book_shop_link]
		);

		res.json(newBook.rows[0]);
	} catch (error) {
		console.error(error.message);
	}
});

// get all books
app.get('/books', async (req, res) => {
	try {
		const allBooks = await pool.query('SELECT * FROM book');

		res.json(allBooks.rows);
	} catch (error) {
		console.error(error.message);
	}
});

// get a book
app.get('/books/:book_id', async (req, res) => {
	try {
		const { book_id } = req.params;
		const book = await pool.query('SELECT * FROM book WHERE book_id = $1', [
			book_id,
		]);

		res.json(book.rows[0]);
	} catch (error) {
		console.error(error.message);
	}
});

// update a book
app.put('/books/:book_id', async (req, res) => {
	try {
		const { book_id } = req.params;
		const { book_title, book_author, isbn, book_shop_link } = req.body;
		const updateBook = await pool.query(
			'UPDATE book SET book_title = $1, book_author = $2, isbn = $3, book_shop_link = $4 WHERE book_id = $5',
			[book_title, book_author, isbn, book_shop_link, book_id]
		);

		res.json('Book was updated!');
	} catch (error) {
		console.error(error.message);
	}
});

// delete a book
app.delete('/books/:book_id', async (req, res) => {
	try {
		const { book_id } = req.params;
		const deleteBook = await pool.query('DELETE FROM book WHERE book_id = $1', [
			book_id,
		]);

		res.json('Book was deleted!');
	} catch (error) {
		console.error(error.message);
	}
});

app.listen(5050, () => {
	console.log('server has started on port 5050');
});
