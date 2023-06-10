import { createAsyncThunk } from '@reduxjs/toolkit';
import {Product, ProductMutation, ValidationError} from '../../types';
import axiosApi from '../../axiosApi';
import {RootState} from "../../app/store";
import {isAxiosError} from "axios";

export const fetchProducts = createAsyncThunk<Product[], string | undefined>(
  'products/fetchAll',
  async (id) => {
    let url = '/products';
    if(id) {
      const response = await axiosApi.get<Product[]>(url + '?category_id=' + id);
      const result = response.data;
      return result ? result : [];
    }  else {
      const response = await axiosApi.get<Product[]>(url);
      const result = response.data;
      return result ? result : [];
    }
  }
);

export const createProduct = createAsyncThunk<void, ProductMutation,  { state: RootState, rejectValue: ValidationError }> (
  'products/create',
  async (productMutation, {getState, rejectWithValue}) => {
    try {
      const token = getState().users.user?.token;
      const formData = new FormData();
      const keys = Object.keys(productMutation) as (keyof ProductMutation)[];
      keys.forEach(key => {
        const value = productMutation[key];
        if (value !== null) {
          formData.append(key, value);
        }
      });
      await axiosApi.post('/products', formData, {headers: {'Authorization': token}});
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  }
);

export const fetchOne = createAsyncThunk<Product, string>(
  'products/fetchOne',
  async (id) => {
    const response = await axiosApi.get('/products/' + id);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk<void, string, { state: RootState }>(
  'products/delete',
  async (id, {getState}) => {
    const token = getState().users.user?.token;

    await axiosApi.delete('/products/' + id, {headers: {'Authorization': token}});
  }
);