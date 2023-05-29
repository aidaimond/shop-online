import express from "express";
import {imagesUpload} from "../multer";
import Product from "../models/Product";
import mongoose from "mongoose";
import {IProduct} from "../types";
import auth, {RequestWithUser} from "../middleware/auth";
import Category from "../models/Category";
import User from "../models/User";
import Subcategory from "../models/Subcategory";

const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
  try {
    if (req.query.category_id) {
      const result = await Product.find({category: req.query.category_id}).populate('category').sort({datetime: -1});
      return res.send(result);
    } else {
      const result = await Product.find().populate('category').sort({datetime: -1});
      return res.send(result);
    }
  } catch (e) {
    return next(e);
  }
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const result = await Product.findById(req.params.id).populate('category user', 'displayName');
    if (!result) {
      return res.sendStatus(404);
    }
    return res.send(result);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

productsRouter.post('/', imagesUpload.single('image'), auth, async (req, res, next) => {

  const user = (req as RequestWithUser).user;
  if (!req.file || !req.body.title || !req.body.price || !req.body.description || !req.body.category ||
  !user ||
  !req.body.subcategory) {
    return res.status(400).send({error: 'All fields are required'});
  }
  const category = await Category.findOne({_id: req.body.category});
  const subcategory = await Subcategory.findOne({_id: req.body.subcategory});

  if (category && subcategory) {
    try {
      const productData: IProduct = {
        title: req.body.title,
        brand: req.body.brand,
        category: category._id.toString(),
        subcategory: subcategory._id.toString(),
        user: user._id.toString(),
        colors: req.body.colors,
        price: parseFloat(req.body.price),
        sale: parseFloat(req.body.sale),
        gender: req.body.gender,
        images: [req.file.filename],
        datetime: new Date().toISOString(),
      };

      const product = new Product(productData);

      await product.save();
      return res.send(product);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  } else {
    return res.send({message: "Category not found"});
  }
});

productsRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const product = await Product.findOne({_id: req.params.id});
    const userId = await User.findOne({_id: product?.user});
    const user = (req as RequestWithUser).user;
    if (product) {
      if (userId?.id === user.id) {
        await Product.deleteOne({_id: req.params.id});
        return res.send({message: "Product removed"});
      } else {
        return res.status(403).send({message: "You can deleted only your product"});
      }
    } else {
      return res.send({message: "Product not found"});
    }
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

export default productsRouter;