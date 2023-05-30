import express from "express";
import Subcategory from "../models/Subcategory";

export const subcategoriesRouter = express.Router();

subcategoriesRouter.get('/', async (req,res, next) => {
  try {
    const categories = await Subcategory.find();
    return res.send(categories);
  } catch (e) {
    return next(e);
  }
});

export default subcategoriesRouter;