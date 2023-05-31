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

  const [watches, accessories, jewelry, decorations] = await Category.create({
    title: "Watches",
  }, {title: "Accessories"}, {title: "Jewelry"});

  const [pens, sunglasses, homeDecor, christmas, womenWatches, swissMade, bracelets, necklaces, rings] = await Subcategory.create({
    title: "Pens",
    category: accessories._id,
  }, {title: "Sunglasses", category: accessories._id,}, {
    title: "Home Decor",
    category: decorations._id,
  }, {title: "Christmas", category: decorations._id,}, {
    title: "Women Watches",
    category: watches._id,
  }, {title: "Swiss Made", category: watches._id,}, {
    title: "Bracelets",
    category: jewelry._id,
  }, {title: "Necklaces", category: jewelry._id,}, {title: "Rings", category: jewelry._id,});

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
      subcategory: womenWatches._id,
      user: user1._id,
      color: "white",
      price: 430,
      composition: "silver",
      image: "fixtures/octeaNovaWatch.jpeg",
      datetime: '2023-03-03T10:57:12.451Z',
    },
    {
      title: "Crystalline Glam Watch",
      brand: cartier._id,
      description: "Swiss Made, Metal bracelet, Blue, Rose gold-tone finish",
      price: 350,
      category: watches._id,
      subcategory: swissMade._id,
      color: "white",
      composition: "silver",
      image: "fixtures/glamWatch.jpeg",
      user: attractor._id,
      datetime: '2023-03-03T11:19:13.952Z',
    },
    {
      title: "Crystalline Aura watch",
      brand: cartier._id,
      description: "Swiss Made, Metal bracelet, Silver tone, Stainless steel",
      price: 1350,
      category: watches._id,
      subcategory: swissMade._id,
      color: "white",
      composition: "silver",
      image: "fixtures/auraWatch.jpg",
      user: user2._id,
      datetime: '2023-03-03T14:51:18.544Z',
    },
    {
      title: "Angelic necklace",
      brand: monaco._id,
      description: "Square cut, Blue, Rhodium plated",
      price: 330,
      category: jewelry._id,
      subcategory: necklaces._id,
      color: "white",
      composition: "silver",
      image: "fixtures/angelic.jpeg",
      user: user1._id,
      datetime: '2023-03-03T14:51:18.544Z',
    },
    {
      title: "Matrix Tennis bracelet",
      brand: monaco._id,
      description: "Round cut, Small, Pink, Rhodium plated",
      price: 250,
      category: jewelry._id,
      subcategory: bracelets._id,
      color: "silver",
      composition: "silver",
      image: "fixtures/angelicBracelet.jpeg",
      user: user2._id,
      datetime: '2023-03-03T14:51:48.642Z',
    },
    {
      title: "Crystalline ballpoint pen",
      brand: swarovski._id,
      description: "Blue, Blue lacquered, Chrome plated",
      price: 55,
      category: accessories._id,
      subcategory: pens._id,
      color: "blue",
      composition: "silver",
      image: "fixtures/pen.jpeg",
      user: user1._id,
      datetime: "2023-03-04T03:36:34.383Z",
    },
    {
      title: "Crystalline Nova pen",
      brand: swarovski._id,
      description: "Rose gold tone, Rose gold-tone plated",
      price: 70,
      category: accessories._id,
      subcategory: pens._id,
      color: "rose gold",
      composition: "silver",
      sale: 0,
      gender: 'women',
      image: "fixtures/ballPen.jpeg",
      user: user2._id,
      datetime: '2023-03-04T08:05:05.990Z',
    });

  await db.close();
};

run().catch(console.error);