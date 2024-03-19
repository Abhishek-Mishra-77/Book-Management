import { Router } from "express";
import { Book } from "../models/bookModel.js";
const router = Router();

router.post("/", async (req, res) => {
  const { title, author, publishYear } = req.body;
  try {
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: "Send all required fields :  title , auther  , publishYear",
      });
    }

    const newBook = {
      title: title,
      author: author,
      publishYear: publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
export default router;
