import express from "express";
import Subcategory from "../models/Subcategory";

export const subcategoriesRouter = express.Router();

subcategoriesRouter.get('/', async (req,res, next) => {
  try {
    const subcategories = await Subcategory.find().populate('category');
    return res.send(subcategories);
  } catch (e) {
    return next(e);
  }
});

export default subcategoriesRouter;