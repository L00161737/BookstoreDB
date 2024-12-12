import express from "express";
import Book from "./Book.js";

const router = express.Router();

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new book
router.post("/add", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a book's stock
router.put("/update/:id", async (req, res) => {
  try {
    console.log(`Updating stock for book ID: ${req.params.id}`);
    console.log(`New stock value: ${req.body.stock}`);

    const { stock } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { stock },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(updatedBook);
  } catch (err) {
    console.error("Error updating stock:", err);
    res.status(500).json({ message: err.message });
  }
});

// Delete a book
router.delete("/delete/:id", async (req, res) => {
  try {
    console.log(`Deleting book with ID: ${req.params.id}`);

    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ message: err.message });
  }
});

// Bulk insert books
router.post("/bulk-add", async (req, res) => {
  try {
    const books = req.body; // Array of books from the frontend
    const insertedBooks = await Book.insertMany(books); // Insert multiple books
    res.status(201).json(insertedBooks);
  } catch (err) {
    console.error("Error adding books:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
