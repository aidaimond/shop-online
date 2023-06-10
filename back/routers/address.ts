import express from "express";
import Address from "../models/Address";

export const addressRouter = express.Router();

addressRouter.get('/', async (req,res, next) => {
  try {
    const brands = await Address.find();
    return res.send(brands);
  } catch (e) {
    return next(e);
  }
});

export default addressRouter;