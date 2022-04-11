import React, { Fragment, useState } from 'react';

const AddBook = () => {
	const [book_title, setBookTitle] = useState('');
	const [book_author, setBookAuthor] = useState('');
	const [isbn, setISBN] = useState('');
	const [book_shop_link, setBookShopLink] = useState('');

	const onSubmitForm = async (e) => {
		e.preventDefault();
		try {
			const body = { book_title, book_author, isbn, book_shop_link };
			const response = await fetch('http://localhost:5050/books', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});

			window.location = '/';
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<Fragment>
			<h1 className="text-center mt-5">BooksToRead</h1>
			<form className="mt-5" onSubmit={onSubmitForm}>
				<div className="mb-3">
					<label for="book-title" className="form-label">
						Book Title
					</label>
					<input
						type="text"
						className="form-control"
						id="book-title"
						value={book_title}
						onChange={(e) => setBookTitle(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label for="book-author" className="form-label">
						Book Author
					</label>
					<input
						type="text"
						className="form-control"
						id="book-author"
						value={book_author}
						onChange={(e) => setBookAuthor(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label for="isbn" className="form-label">
						ISBN
					</label>
					<input
						type="text"
						className="form-control"
						id="isbn"
						value={isbn}
						onChange={(e) => setISBN(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label for="book-shop-link" className="form-label">
						Book Shop (URL)
					</label>
					<input
						type="text"
						className="form-control"
						id="book-shop-link"
						value={book_shop_link}
						onChange={(e) => setBookShopLink(e.target.value)}
					/>
				</div>
				<div className="d-grid gap-2">
					<button type="submit" className="btn btn-primary">
						Add a book
					</button>
				</div>
			</form>
		</Fragment>
	);
};

export default AddBook;
