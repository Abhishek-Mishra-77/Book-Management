import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import AddBook from "./controller/AddBook.js";
import getAllBooks from "./controller/getAllBook.js";
import getSingleBook from "./controller/getSingleBook.js";
import updateBook from "./controller/updateBook.js";
import removeBook from "./controller/removeBook.js";

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

const app = express();
app.use(cors());
app.use(express.json());

// Book route post
app.post("/", AddBook);
app.get("/books", getAllBooks);
app.get("/books/:id", getSingleBook);
app.put("/books/update/:id", updateBook);
app.delete("/books/delete/:id", removeBook);

app.listen(process.env.PORT, () => {
  console.log("server started at " + process.env.PORT + " port");
});
