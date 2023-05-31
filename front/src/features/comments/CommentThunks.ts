import axiosApi from "../../axiosApi";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Comment, CommentsMutation} from "../../types";

export const fetchComments = createAsyncThunk<Comment[], string>(
  'comments/fetchAll',
  async (id) => {
    let url = '/comments';
    if (id) {
      const response = await axiosApi.get(url + '?product_id=' + id);
      const comments = response.data;
      return comments ? comments : [];
    } else {
      const response = await axiosApi.get(url);
      const comments = response.data;
      return comments ? comments : [];
    }
  }
);

export const createComments = createAsyncThunk<void, CommentsMutation>(
  'comments/create',
  async (mutation) => {
    await axiosApi.post('/comments', mutation);
  }
);

export const deleteComments = createAsyncThunk<void, string>(
  'comments/delete',
  async (id) => {
    await axiosApi.delete('/comments/' + id);
  }
);