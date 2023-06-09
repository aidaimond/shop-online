import express from "express";
import Basket from "../models/Basket";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";

export const basketRouter = express.Router();

basketRouter.get('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const basket = await Basket.find({user: user._id}).populate('basketItems.product');
    return res.send(basket[0].basketItems);
  } catch (e) {
    return next(e);
  }
});

basketRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const productId = req.body.product;

    const basket = await Basket.findOne({user: user._id});
    console.log('basket: ', basket);

    if (basket) {
      const existingProduct = basket.basketItems.find((product) => product.product._id.toString() === productId);
      console.log('existingProduct:', existingProduct);

      if (existingProduct) {
        existingProduct.amount += 1;
      } else {
        basket.basketItems.push({product: productId, amount: 1});
      }
      await basket.save();

    } else {
      const newBasket = new Basket({user: user._id, basketItems: [{product: productId, amount: 1}]});
      await newBasket.save();
    }

  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default basketRouter;