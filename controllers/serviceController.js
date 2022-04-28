import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel";

// @desc    Auth admin & get token
// @rout    POST /admin
// @acce    Private
export const createCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.body;
  const category = Category.findOne({ categoryName });

  if (category) {
    res.status(409).json({
      message: "This category already exist",
    });
  }

  const newCategory = await Category.create({ categoryName });
  if (newCategory)
    res.status(201).json({
      newCategory: newCategory.categoryName,
    });

  res.status(400).json({
    message: "Invalid data",
  });
});

export const editCategory = asyncHandler(async (req, res) => {
  const categoryId = req.body._id;
  const category = Category.findOne({ _id: categoryId });

  if (!category)
    res.status(404).json({
      message: "Given cateogry not found in database",
    });

  await Category.updateOne({ _id: categoryId }, { ...req.body }).then(() =>
    res.status(200).json({
      message: "modified succesfuly",
    })
  );
});

export const deleteCategory = asyncHandler(async (req, res) => {
    const categoryId = req.body._id;
    const category = Category.findOne({ _id: categoryId });
  
    if (!category)
      res.status(404).json({
        message: "Given cateogry not found in database",
      });

    await Category.deleteOne({...req.body}).then(()=>
    res.status(204))
    
});
