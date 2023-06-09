import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Basket, ValidationError} from "../../types";
import {isAxiosError} from "axios";
import {RootState} from "../../app/store";

export const fetchBasket = createAsyncThunk<Basket[]>(
  'basket/fetch',
  async () => {
    const response = await axiosApi.get<Basket[]>('/basket');
    return response.data;
  }
);

export const createBasket = createAsyncThunk<void, string, { state: RootState, rejectValue: ValidationError }>(
  'basket/create',
  async (id, {getState, rejectWithValue}) => {
    try {
      const token = getState().users.user?.token;
      const product = {product: id}
      await axiosApi.post('/basket', product, {headers: {'Authorization': token}});
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);

export const deleteBasket = createAsyncThunk<void, string, { state: RootState, rejectValue: ValidationError }>(
  'basket/delete',
  async (id,  {getState, rejectWithValue}) => {
    try {
      const token = getState().users.user?.token;
      await axiosApi.delete(`/basket/${id}`, { headers: { 'Authorization': token } });
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);