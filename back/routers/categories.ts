import express from "express";
import Category from "../models/Category";

export const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req,res, next) => {
  try {
    const categories = await Category.find();
    console.log(categories);
    return res.send(categories);
  } catch (e) {
    return next(e);
  }
});

export default categoriesRouter;