import { createAsyncThunk } from '@reduxjs/toolkit';
import {Comment} from '../../types';
import axiosApi from '../../axiosApi';

export const fetchComments = createAsyncThunk<Comment[]>(
  'comments/fetch',
  async () => {
    const response = await  axiosApi.get<Comment[]>('/comments');
    return response.data;
  }
)