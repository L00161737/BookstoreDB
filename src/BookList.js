import React, { useState, useEffect } from "react";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePurchase = (id, currentStock) => {
    const quantity = parseInt(prompt("Enter the quantity to purchase (1-5):"), 10);

    if (quantity < 1 || quantity > 5 || isNaN(quantity)) {
      alert("Please enter a valid quantity between 1 and 5.");
      return;
    }

    if (currentStock >= quantity) {
      axios
        .put(`http://localhost:5000/api/books/update/${id}`, { stock: currentStock - quantity })
        .then(() => {
          setBooks(
            books.map((book) =>
              book._id === id ? { ...book, stock: book.stock - quantity } : book
            )
          );
        })
        .catch((error) => console.error("Error updating stock:", error));
    } else {
      alert("Not enough stock available.");
    }
  };

  return (
    <div>
      <h1>Books</h1>
      <input
        type="text"
        placeholder="Search for a book..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: "10px",
          margin: "10px 0",
          fontSize: "16px",
          width: "100%",
        }}
      />
      <ul>
        {filteredBooks.map((book) => (
          <li key={book._id}>
            <strong>{book.title}</strong> by {book.author} - ${book.price} (Stock: {book.stock})
            <button
              onClick={() => handlePurchase(book._id, book.stock)}
              style={{
                marginLeft: "10px",
                padding: "5px 10px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              disabled={book.stock === 0}
            >
              {book.stock > 0 ? "Purchase" : "Out of Stock"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
