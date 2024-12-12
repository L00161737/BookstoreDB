import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ISBN: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
