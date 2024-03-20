import { Router } from "express";
import { Book } from "../models/bookModel.js";

const router = Router();

router.put("/books/update/:id", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;
    const { id } = req.params;

    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: "Send all required fields :  title , auther  , publishYear",
      });
    }

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(400).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
