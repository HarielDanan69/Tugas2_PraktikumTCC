import express from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/UserController.js";

const router = express.Router();
router.get("/Notes", getNotes);
router.post("/Notes", createNote);
router.patch("/Notes/:id", updateNote);
router.delete("/Notes/:id", deleteNote);

export default router;
