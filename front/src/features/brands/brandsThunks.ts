import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Brand} from "../../types";

export const fetchBrands = createAsyncThunk<Brand[]>(
  'brands/fetch',
  async () => {
    const response = await  axiosApi.get<Brand[]>('/brands');
    return response.data;
  }
)