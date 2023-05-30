import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchSubcategories = createAsyncThunk<Category[]>(
  'subcategories/fetch',
  async () => {
    const response = await  axiosApi.get<Category[]>('/subcategories');
    return response.data;
  }
)