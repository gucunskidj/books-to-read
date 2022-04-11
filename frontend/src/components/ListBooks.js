import React, { Fragment, useState, useEffect } from 'react';
import EditBook from './EditBook';

const ListBooks = () => {
	const [books, setBooks] = useState([]);

	const deleteBook = async (book_id) => {
		try {
			const deleteBook = await fetch(`http://localhost:5050/books/${book_id}`, {
				method: 'DELETE',
			});

			setBooks(books.filter((book) => book.book_id !== book_id));
		} catch (error) {
			console.error(error.message);
		}
	};

	const getBooks = async () => {
		try {
			const response = await fetch('http://localhost:5050/books');
			const jsonData = await response.json();
			setBooks(jsonData);
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getBooks();
	}, []);

	return (
		<Fragment>
			<table className="table mt-5 text-center table-hover">
				<thead>
					<tr>
						<th scope="col">Book Title</th>
						<th scope="col">Book Author</th>
						<th scope="col">ISBN</th>
						<th scope="col">Book Shop</th>
					</tr>
				</thead>
				<tbody>
					{books.map((book) => (
						<tr key={book.book_id}>
							<td>{book.book_title}</td>
							<td>{book.book_author}</td>
							<td>{book.isbn}</td>
							<td>
								<a
									href={book.book_shop_link}
									rel="noopener noreferrer"
									target="_blank"
									type="button"
									className="btn btn-success"
								>
									Buy
								</a>
							</td>
							<td>
								<EditBook book={book} />
							</td>
							<td>
								<button
									className="btn btn-danger"
									onClick={() => deleteBook(book.book_id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Fragment>
	);
};

export default ListBooks;
