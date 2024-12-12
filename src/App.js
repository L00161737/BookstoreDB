import React from "react";
import BookList from "./BookList";
import AdminPanel from "./AdminPanel";
import "./App.css";

const App = () => {
  return (
    <div>
      <h1>Welcome to the Bookstore</h1>
      <BookList />
      <hr />
      <AdminPanel />
    </div>
  );
};

export default App;
