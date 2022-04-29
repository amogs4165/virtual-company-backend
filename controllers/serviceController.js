import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";

// @desc    To get all category details
// @rout    GET /category
// @acce    Private - admin
export const allCategory = asyncHandler(async (req, res) => {
  const allCategory = await Category.find();

  if (allCategory) return res.status(201).json({ allCategory: allCategory });

  res.status(204).json({ messge: "No categories found" });
});

// @desc    To create new category
// @rout    POST /category
// @acce    Private - admin
export const createCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.body;
  const category = await Category.findOne({ categoryName: categoryName });

  if (category) {
    return res.status(409).json({
      message: "This category already exist",
    });
  }

  const newCategory = await Category.create(req.body);
  if (newCategory)
    return res.status(201).json({
      newCategory: newCategory.categoryName,
    });

  res.status(400).json({
    message: "Invalid data",
  });
});

// @desc    To modify a existing category
// @rout    PUT /category
// @acce    Private - admin
export const editCategory = asyncHandler(async (req, res) => {
  const categoryId = req.body._id;
  const category = Category.findOne({ _id: categoryId });

  if (!category)
    return res.status(404).json({
      message: "Given cateogry not found in database",
    });

  await Category.updateOne({ _id: categoryId }, { ...req.body }).then(() =>
    res.status(200).json({
      message: "modified succesfuly",
    })
  );
});

// @desc    To delete a existing category
// @rout    DELETE /category
// @acce    Private - admin
export const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.body._id;
  const category = await Category.findOne({ _id: categoryId });

  if (!category)
    return res.status(404).json({
      message: "Given cateogry not found in database",
    });

  await Category.deleteOne({ ...req.body }).then(() =>
    res.status(200).json({ message: "Category deleted" })
  );
});
