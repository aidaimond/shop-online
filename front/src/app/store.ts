import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import {usersReducer} from "../features/users/usersSlice";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {productsReducer} from "../features/products/productsSlice";
import {categoriesReducer} from "../features/categories/categoriesSlice";
import {commentsReducer} from "../features/comments/CommentSlice";
import {subcategoriesReducer} from "../features/subcategories/SubcategoriesSlice";
import {brandsReducer} from "../features/brands/brandsSlice";
import {basketReducer} from "../features/basket/basketSlice";
import {orderReducer} from "../features/orders/orderSlice";

const usersPersistConfig = {
  key: 'shine:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  subcategories: subcategoriesReducer,
  comments: commentsReducer,
  brands: brandsReducer,
  basket: basketReducer,
  orders: orderReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;