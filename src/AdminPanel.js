import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    stock: "",
    ISBN: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios
      .get("http://localhost:5000/api/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const addBook = () => {
    axios
      .post("http://localhost:5000/api/books/add", newBook)
      .then(() => {
        fetchBooks();
        setNewBook({ title: "", author: "", category: "", price: "", stock: "", ISBN: "" });
      })
      .catch((error) => {
        console.error("Error adding book:", error);
      });
  };

  const deleteBook = (id) => {
    axios
      .delete(`http://localhost:5000/api/books/delete/${id}`)
      .then(() => fetchBooks())
      .catch((error) => console.error("Error deleting book:", error));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const books = JSON.parse(e.target.result);
          axios
            .post("http://localhost:5000/api/books/bulk-add", books)
            .then(() => fetchBooks())
            .catch((error) => console.error("Error uploading books:", error));
        } catch (err) {
          console.error("Invalid JSON file:", err);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <h3>Add New Book</h3>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newBook.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={newBook.author}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={newBook.category}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={newBook.price}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={newBook.stock}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="ISBN"
        placeholder="ISBN"
        value={newBook.ISBN}
        onChange={handleInputChange}
      />
      <button onClick={addBook}>Add Book</button>

      <h3>Bulk Upload Books</h3>
      <input type="file" accept=".json" onChange={handleFileUpload} />

      <h3>Existing Books</h3>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author} - ${book.price} (Stock: {book.stock})
            <button onClick={() => deleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;

