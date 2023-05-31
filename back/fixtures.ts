import crypto from 'crypto';
import mongoose from 'mongoose';
import config from './config';
import Category from './models/Category';
import Product from './models/Product';
import User from './models/User';
import Subcategory from "./models/Subcategory";
import Brand from "./models/Brand";

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('categories');
    await db.dropCollection('products');
    await db.dropCollection('users');
    await db.dropCollection('brands');
    await db.dropCollection('subcategories');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [swarovski, cartier, monaco] = await Brand.create({
    title: "Swarovski",
  }, {title: "Cartier"}, {title: "Apm Monaco"});

  const [watches, accessories, jewelry] = await Category.create({
    title: "Watches",
  }, {title: "Accessories"}, {title: "Jewelry"});

  const [gold, silver] = await Subcategory.create({
    title: "Gold",
    category: watches._id,
  }, {title: "Silver", category: accessories._id,});

  const [user1, user2, attractor] = await User.create({
      email: 'user@mail.ru',
      password: '1qaz2wsx',
      avatar: 'fixtures/user.jpeg',
      displayName: 'User',
      token: crypto.randomUUID(),
      role: 'user',
    phoneNumber: '0555000555',
    },
    {
      email: 'admin@mail.ru',
      password: '2wsx3edc',
      avatar: 'fixtures/attractor.jpeg',
      displayName: 'Admin',
      token: crypto.randomUUID(),
      role: 'admin',
      phoneNumber: '0555000555',
    },
    {
      email: 'attractor@mail.ru',
      password: '1qaz2wsx',
      avatar: 'fixtures/attractor.jpeg',
      displayName: 'Attractor',
      token: crypto.randomUUID(),
      role: 'user',
      phoneNumber: '0555000555',
    });

  await Product.create({
      title: "Octea Nova Watch",
      brand: swarovski._id,
      category: watches._id,
      subcategory: silver._id,
      user: user1._id,
      colors: ["white"],
      price: 430,
      sale: 30,
      gender: 'women',
    composition: "silver",
      images: ["fixtures/octeaNovaWatch.jpeg"],
      datetime: '2023-03-03T10:57:12.451Z',
    },
    {
      title: "Crystalline Glam Watch",
      brand: cartier._id,
      description: "Swiss Made, Metal bracelet, Blue, Rose gold-tone finish",
      price: 350,
      category: watches._id,
      subcategory: gold._id,
      colors: ["white"],
      sale: 20,
      gender: 'women',
      composition: "silver",
      images: ["fixtures/glamWatch.jpeg"],
      user: attractor._id,
      datetime: '2023-03-03T11:19:13.952Z',
    },
    {
      title: "Crystalline Aura watch",
      brand: cartier._id,
      description: "Swiss Made, Metal bracelet, Silver tone, Stainless steel",
      price: 1350,
      category: watches._id,
      subcategory: gold._id,
      colors: ["white"],
      sale: 30,
      composition: "silver",
      gender: 'women',
      images: ["fixtures/auraWatch.jpg"],
      user: user2._id,
      datetime: '2023-03-03T14:51:18.544Z',
    },
    {
      title: "Angelic necklace",
      brand: monaco._id,
      description: "Square cut, Blue, Rhodium plated",
      price: 330,
      category: jewelry._id,
      subcategory: gold._id,
      colors: ["white"],
      composition: "silver",
      sale: 0,
      gender: 'women',
      images: ["fixtures/angelic.jpeg"],
      user: user1._id,
      datetime: '2023-03-03T14:51:18.544Z',
    },
    {
      title: "Matrix Tennis bracelet",
      brand: monaco._id,
      description: "Round cut, Small, Pink, Rhodium plated",
      price: 250,
      category: jewelry._id,
      subcategory: silver._id,
      colors: ["silver"],
      composition: "silver",
      sale: 20,
      gender: 'women',
      images: ["fixtures/angelicBracelet.jpeg"],
      user: user2._id,
      datetime: '2023-03-03T14:51:48.642Z',
    },
    {
      title: "Crystalline ballpoint pen",
      brand: swarovski._id,
      description: "Blue, Blue lacquered, Chrome plated",
      price: 55,
      category: accessories._id,
      subcategory: silver._id,
      colors: ["blue"],
      composition: "silver",
      sale: 10,
      gender: 'women',
      images: ["fixtures/pen.jpeg"],
      user: user1._id,
      datetime: "2023-03-04T03:36:34.383Z",
    },
    {
      title: "Crystalline Nova pen",
      brand: swarovski._id,
      description: "Rose gold tone, Rose gold-tone plated",
      price: 70,
      category: accessories._id,
      subcategory: silver._id,
      colors: ["rose gold"],
      composition: "silver",
      sale: 0,
      gender: 'women',
      images: ["fixtures/ballPen.jpeg"],
      user: user2._id,
      datetime: '2023-03-04T08:05:05.990Z',
    });

  await db.close();
};

run().catch(console.error);