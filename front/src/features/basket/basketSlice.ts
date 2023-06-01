import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {Basket} from "../../types";
import {createBasket, fetchBasket} from "./basketThunks";

interface BasketState {
  basket: Basket[];
  basketLoading: boolean;
  createBasketLoading: boolean;
}

const initialState: BasketState = {
  basket: [],
  basketLoading: false,
  createBasketLoading: false,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBasket.pending, (state) => {
      state.basketLoading = true;
    });
    builder.addCase(fetchBasket.fulfilled, (state, {payload: categories}) => {
      state.basketLoading = false;
      state.basket = categories;
    });
    builder.addCase(fetchBasket.rejected, (state) => {
      state.basketLoading = false;
    });

    builder.addCase(createBasket.pending, (state) => {
      state.basketLoading = true;
    });
    builder.addCase(createBasket.fulfilled, (state) => {
      state.basketLoading = false;
    });
    builder.addCase(createBasket.rejected, (state) => {
      state.basketLoading = false;
    });
  }
});

export const basketReducer = basketSlice.reducer;

export const selectBasket = (state: RootState) => state.basket.basket;
export const selectBasketLoading = (state: RootState) => state.basket.basketLoading;