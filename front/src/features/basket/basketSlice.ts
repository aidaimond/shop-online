import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {Basket} from "../../types";
import {createBasket, deleteBasket, fetchBasket} from "./basketThunks";

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
    builder.addCase(fetchBasket.fulfilled, (state, {payload: basket}) => {
      state.basketLoading = false;
      state.basket = basket;
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

    builder.addCase(deleteBasket.pending, (state) => {
      state.basketLoading = true;
    });
    builder.addCase(deleteBasket.fulfilled, (state) => {
      state.basketLoading = false;

    });
    builder.addCase(deleteBasket.rejected, (state) => {
      state.basketLoading = false;
    });
  }
});

export const basketReducer = basketSlice.reducer;

export const selectBasket = (state: RootState) => state.basket.basket;
export const selectBasketLoading = (state: RootState) => state.basket.basketLoading;