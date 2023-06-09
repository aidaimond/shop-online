import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Basket} from "../../types";

export const fetchBasket = createAsyncThunk<Basket[]>(
  'basket/fetch',
  async () => {
    const response = await  axiosApi.get<Basket[]>('/basket');
    return response.data;
  }
);

export const createBasket = createAsyncThunk<void, string>(
  'basket/create',
  async (id) => {
    const product = {product: id}
    await axiosApi.post('/basket', product);
  }
);