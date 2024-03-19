import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MyProvider = createContext();

const Context = ({ children }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get("http://localhost:5000/books");
      const { data } = response;
      setBooks(data.data);
    };
    fetchBooks();
  }, []);

  const addBookHandler = async (e) => {
    e.preventDefault();
    if (editId) {
      try {
        const response = await axios.put(
          `http://localhost:5000/books/update/${editId}`,
          {
            title: title,
            author: author,
            publishYear: publishYear,
          }
        );
        const updatedBooks = books.map((book) => {
          if (book._id === editId) {
            return {
              ...book,
              title: title,
              author: author,
              publishYear: publishYear,
            };
          }
          return book;
        });
        setBooks(updatedBooks);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.post("http://localhost:5000", {
          title: title,
          author: author,
          publishYear: publishYear,
        });
        const { data } = response;
        setBooks((prevBooks) => [
          ...prevBooks,
          {
            title: data.title,
            author: data.author,
            publishYear: data.publishYear,
            _id: data._id,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    }
    setTitle("");
    setAuthor("");
    setPublishYear("");
  };

  const removeHandler = async (id) => {
    if (id) {
      const filteredBooks = books.filter((book) => book._id !== id);
      setBooks(filteredBooks);
      try {
        const response = await axios.delete(
          `http://localhost:5000/books/delete/${id}`
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateHandler = (book) => {
    setAuthor(book.author);
    setPublishYear(book.publishYear);
    setTitle(book.title);
    setEditId(book._id);
  };

  const state = {
    addBookHandler,
    author,
    setAuthor,
    title,
    setTitle,
    publishYear,
    setPublishYear,
    books,
    removeHandler,
    updateHandler,
  };

  return <MyProvider.Provider value={state}>{children}</MyProvider.Provider>;
};

export default Context;
