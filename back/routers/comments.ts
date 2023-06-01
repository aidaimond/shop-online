import express from "express";
import Comment from "../models/Comment";
import {IComment} from "../types";
import Product from "../models/Product";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";
import User from "../models/User";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    if (req.query.product_id) {
      const result = await Comment.find({product: req.query.product_id}).populate('user');
      return res.send(result);
    } else {
      const result = await Comment.find();
      return res.send(result);
    }
  } catch (e) {
    return next(e);
  }
});

commentsRouter.post('/', imagesUpload.single('image'), auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  const product = await Product.findOne({_id: req.body.product});

  if (product) {
    try {
      const commentData: IComment = {
        product: product._id.toString(),
        user: user._id.toString(),
        description: req.body.description,
      }

      const comment = new Comment(commentData);
      await comment.save();
      return res.send(comment);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  } else {
    return res.send({message: "Product not found"});
  }

});

commentsRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const comment = await Comment.findOne({_id: req.params.id});
    const userId = await User.findOne({_id: comment?.user});
    const user = (req as RequestWithUser).user;

    if (comment) {
      if (userId?.id === user.id) {
        await Comment.deleteOne({_id: req.params.id});
        return res.send({message: "Comment removed"});
      } else {
        return res.status(403).send({message: "You can deleted only your comment"});
      }
    } else {
      return res.send({message: "Comment not found"});
    }
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

export default commentsRouter;