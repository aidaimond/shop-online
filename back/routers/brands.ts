import express from "express";
import Brand from "../models/Brand";

export const brandsRouter = express.Router();

brandsRouter.get('/', async (req,res, next) => {
  try {
    const brands = await Brand.find();
    return res.send(brands);
  } catch (e) {
    return next(e);
  }
});

export default brandsRouter;