import {createSlice} from '@reduxjs/toolkit';
import {fetchOrders} from "./orderThunks";
import {Order} from "../../types";

interface OrderState {
  orders: Order[];
  orderLoading: boolean;
}

const initialState: OrderState = {
  orders: [],
  orderLoading: false,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.orderLoading = false;
      });
  },
});

export const orderReducer = orderSlice.reducer;

