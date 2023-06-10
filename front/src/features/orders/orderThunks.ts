import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {Address, Order, PickupMutation, ShippingMutation, ValidationError} from "../../types";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";

export const fetchOrders = createAsyncThunk<Order[], void, { state: RootState, rejectValue: ValidationError }>(
  'orders/fetch',
  async (_, {getState, rejectWithValue}) => {
    try {
      const token = getState().users.user?.token;
      const response = await axiosApi.get<Order[]>('/orders', {headers: {'Authorization': token}});
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  });

export const createOrder = createAsyncThunk<void, ShippingMutation, { state: RootState, rejectValue: ValidationError }>(
  'orders/create',
  async (mutation, {getState, rejectWithValue}) => {
    try {
      const token = getState().users.user?.token;
      await axiosApi.post('/orders', mutation, {headers: {'Authorization': token}});
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);

export const fetchAddress = createAsyncThunk<Address[]>(
  'address/fetch',
  async () => {
    const response = await axiosApi.get<Address[]>('/address');
    return response.data;
  }
);

export const createPickup = createAsyncThunk<void, PickupMutation, { state: RootState, rejectValue: ValidationError }>(
  'orders/create',
  async (mutation, {getState, rejectWithValue}) => {
    try {
      const token = getState().users.user?.token;
      await axiosApi.post('/orders/pickup', mutation, {headers: {'Authorization': token}});
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);

export const updateOrderStatus = createAsyncThunk<void, { id: string, mutation: string }, { rejectValue: ValidationError }>(
  'orders/updateStatus',
  async ({ id, mutation }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.put(`/orders/${id}`, { status: mutation });
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);
