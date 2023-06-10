import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";
import Order from "../models/Order";
import Basket from "../models/Basket";
import {IOrder, IPickup} from "../types";
import Pickup from "../models/Pickup";

export const orderRouter = express.Router();

orderRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const basket = await Basket.findOne({user: user._id});

    if (!basket) {
      return res.status(404).send("Basket not found.");
    }

    const orderData: IOrder = {
      user: user._id.toString(),
      basketItems: basket.basketItems,
      city: req.body.city,
      street: req.body.street,
      house: req.body.house,
      apartment: req.body.apartment,
      entrance: req.body.entrance,
      floor: req.body.floor,
      notes: req.body.notes,
      datetime: new Date().toISOString(),
    };

    const order = new Order(orderData);

    await order.save();
    return res.send(order);

  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

orderRouter.post('/pickup', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const basket = await Basket.findOne({user: user._id});

    if (!basket) {
      return res.status(404).send("Basket not found.");
    }

    const pickupData: IPickup = {
      user: user._id.toString(),
      basketItems: basket.basketItems,
      address: req.body.address,
      datetime: new Date().toISOString(),
    };

    const pickup = new Pickup(pickupData);

    await pickup.save();
    return res.send(pickup);

  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default orderRouter;