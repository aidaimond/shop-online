import {createSlice} from '@reduxjs/toolkit';
import {createOrder, fetchAddress, fetchOrders, updateOrderStatus} from "./orderThunks";
import {Address, Order} from "../../types";
import {RootState} from "../../app/store";

interface OrderState {
  orders: Order[];
  address: Address[];
  orderLoading: boolean;
  createLoading: boolean;
  addressLoading: boolean;
  pickupLoading: boolean;
  updateStatusLoading: boolean;
}

const initialState: OrderState = {
  orders: [],
  address: [],
  orderLoading: false,
  createLoading: false,
  addressLoading: false,
  pickupLoading: false,
  updateStatusLoading: false,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.orderLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orderLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.orderLoading = false;
    });

    builder.addCase(createOrder.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createOrder.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createOrder.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(fetchAddress.pending, (state) => {
      state.addressLoading = true;
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.addressLoading = false;
      state.address = action.payload;
    });
    builder.addCase(fetchAddress.rejected, (state) => {
      state.addressLoading = false;
    });

    builder.addCase(updateOrderStatus.pending, (state) => {
      state.updateStatusLoading = true;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state) => {
      state.updateStatusLoading = false;
    });
    builder.addCase(updateOrderStatus.rejected, (state) => {
      state.updateStatusLoading = false;
    });

  },
});

export const orderReducer = orderSlice.reducer;

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectAddress = (state: RootState) => state.orders.address;
export const selectOrderLoading = (state: RootState) => state.orders.orderLoading;
export const selectCreateOrderLoading = (state: RootState) => state.orders.createLoading;
export const selectAddressLoading = (state: RootState) => state.orders.addressLoading;
export const selectPickupLoading = (state: RootState) => state.orders.pickupLoading;
export const selectUpdateStatusLoading = (state: RootState) => state.orders.updateStatusLoading;

