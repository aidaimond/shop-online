import {Product, ValidationError} from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {createProduct, fetchOne, fetchProducts} from './productsThunks';

interface ProductsState {
  products: Product[];
  productsLoading: boolean;
  createProductsLoading: boolean;
  oneProduct: Product | null;
  deleteLoading: boolean;
  oneProductLoading: boolean;
  createError: ValidationError | null;
}

const initialState: ProductsState = {
  products: [],
  productsLoading: false,
  createProductsLoading: false,
  oneProduct: null,
  deleteLoading: false,
  oneProductLoading: false,
  createError: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.productsLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, {payload: products}) => {
      state.productsLoading= false;
      state.products = products;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.productsLoading = false;
    });

    builder.addCase(createProduct.pending, (state) => {
      state.createProductsLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.createProductsLoading = false;
    });
    builder.addCase(createProduct.rejected, (state, {payload: error}) => {
      state.createProductsLoading = false;
      state.createError = error || null;
    });

    builder.addCase(fetchOne.pending, (state) => {
      state.oneProductLoading = true;
    });
    builder.addCase(fetchOne.fulfilled, (state, action) => {
      state.oneProduct = action.payload;
      state.oneProductLoading = false;
    });
    builder.addCase(fetchOne.rejected, (state) => {
      state.oneProductLoading = false;
    });
  }
});

export const productsReducer = productsSlice.reducer;

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsFetching = (state: RootState) => state.products.productsLoading;
export const selectProductsCreating = (state: RootState) => state.products.createProductsLoading;
export const selectOneProduct = (state: RootState) => state.products.oneProduct;
export const selectDeleteLoading = (state: RootState) => state.products.deleteLoading;
export const selectOneLoading = (state: RootState) => state.products.oneProductLoading;
export const selectError = (state: RootState) => state.products.createError;
