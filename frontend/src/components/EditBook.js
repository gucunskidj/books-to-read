import React, { Fragment, useState } from 'react';

const EditBook = ({ book }) => {
	const [book_title, setBookTitle] = useState(book.book_title);
	const [book_author, setBookAuthor] = useState(book.book_author);
	const [isbn, setISBN] = useState(book.isbn);
	const [book_shop_link, setBookShopLink] = useState(book.book_shop_link);

	const updateBook = async (e) => {
		e.preventDefault();
		try {
			const body = { book_title, book_author, isbn, book_shop_link };
			const response = await fetch(
				`http://localhost:5050/books/${book.book_id}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body),
				}
			);

			window.location = '/';
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<Fragment>
			<button
				type="button"
				className="btn btn-warning"
				data-bs-toggle="modal"
				data-bs-target={`#id${book.book_id}`}
			>
				Edit
			</button>

			<div
				className="modal fade"
				id={`id${book.book_id}`}
				tabindex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
				onClick={() => {
					setBookTitle(book.book_title);
					setBookAuthor(book.book_author);
					setISBN(book.isbn);
					setBookShopLink(book.book_shop_link);
				}}
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Edit Book
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={() => {
									setBookTitle(book.book_title);
									setBookAuthor(book.book_author);
									setISBN(book.isbn);
									setBookShopLink(book.book_shop_link);
								}}
							></button>
						</div>
						<div className="modal-body">
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
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
								onClick={() => {
									setBookTitle(book.book_title);
									setBookAuthor(book.book_author);
									setISBN(book.isbn);
									setBookShopLink(book.book_shop_link);
								}}
							>
								Close
							</button>
							<button
								type="button"
								className="btn btn-warning"
								onClick={(e) => updateBook(e)}
							>
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default EditBook;
