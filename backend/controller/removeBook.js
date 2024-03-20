import { Router } from "express";
import { Book } from "../models/bookModel.js";

const router = Router();

router.delete("/books/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book Deleted successfully" });
  } catch (error) {
    console.log(error.message);
    console.log(error.message)
    res.status(500).send({ message: error.message });
  }
});

export default router;
