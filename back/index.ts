import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from "./config";
import usersRouter from "./routers/users";
import categoriesRouter from "./routers/categories";
import productsRouter from "./routers/products";
import subcategoriesRouter from "./routers/subcategories";
import commentsRouter from "./routers/comments";
import brandsRouter from "./routers/brands";
import basketRouter from "./routers/basket";
import orderRouter from "./routers/order";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/subcategories', subcategoriesRouter);
app.use('/comments', commentsRouter);
app.use('/brands', brandsRouter);
app.use('/basket', basketRouter);
app.use('/orders', orderRouter);

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};
run().catch(console.error);