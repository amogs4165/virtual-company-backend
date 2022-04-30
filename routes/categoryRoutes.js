import express from "express";
import {
  allCategory,
  createCategory,
  deleteCategory,
  editCategory,
} from "../controllers/serviceController.js";

const router = express.Router();

router
  .route("/")
  .get(allCategory)
  .post(createCategory)
  .put(editCategory)
  .delete(deleteCategory);

export default router;
