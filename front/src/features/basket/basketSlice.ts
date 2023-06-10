import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {Basket} from "../../types";
import {createBasket, deleteBasket, deleteBasketProduct, fetchBasket} from "./basketThunks";

interface BasketState {
  basket: Basket[];
  basketLoading: boolean;
  createBasketLoading: boolean;
  deleteBasketProductLoading: boolean;
  deleteBasketLoading: boolean;
}

const initialState: BasketState = {
  basket: [],
  basketLoading: false,
  createBasketLoading: false,
  deleteBasketLoading:false,
  deleteBasketProductLoading: false,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBasket.pending, (state) => {
      state.basketLoading = true;
    });
    builder.addCase(fetchBasket.fulfilled, (state, {payload: basket}) => {
      state.basketLoading = false;
      state.basket = basket;
    });
    builder.addCase(fetchBasket.rejected, (state) => {
      state.basketLoading = false;
    });

    builder.addCase(createBasket.pending, (state) => {
      state.createBasketLoading = true;
    });
    builder.addCase(createBasket.fulfilled, (state) => {
      state.createBasketLoading = false;

    });
    builder.addCase(createBasket.rejected, (state) => {
      state.createBasketLoading = false;
    });

    builder.addCase(deleteBasketProduct.pending, (state) => {
      state.deleteBasketProductLoading = true;
    });
    builder.addCase(deleteBasketProduct.fulfilled, (state) => {
      state.deleteBasketProductLoading = false;

    });
    builder.addCase(deleteBasketProduct.rejected, (state) => {
      state.deleteBasketProductLoading = false;
    });

    builder.addCase(deleteBasket.pending, (state) => {
      state.deleteBasketLoading = true;
    });
    builder.addCase(deleteBasket.fulfilled, (state) => {
      state.deleteBasketLoading = false;

    });
    builder.addCase(deleteBasket.rejected, (state) => {
      state.deleteBasketLoading = false;
    });
  }
});

export const basketReducer = basketSlice.reducer;

export const selectBasket = (state: RootState) => state.basket.basket;
export const selectBasketLoading = (state: RootState) => state.basket.basketLoading;
export const selectCreateBasketLoading = (state: RootState) => state.basket.createBasketLoading;
export const selectDeleteBasketProductLoading = (state: RootState) => state.basket.deleteBasketProductLoading;
