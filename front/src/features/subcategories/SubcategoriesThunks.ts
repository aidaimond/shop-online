import { createAsyncThunk } from '@reduxjs/toolkit';
import { Subcategory} from '../../types';
import axiosApi from '../../axiosApi';

export const fetchSubcategories = createAsyncThunk<Subcategory[]>(
  'subcategories/fetch',
  async () => {
    const response = await  axiosApi.get<Subcategory[]>('/subcategories');
    return response.data;
  }
)