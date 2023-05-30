import {createSlice} from "@reduxjs/toolkit";
import {Comment} from "../../types";
import {fetchComments} from "./CommentThunks";
import {RootState} from "../../app/store";


interface CommentsState{
  comments: Comment[];
  commentsLoading: boolean;
}

const initialState: CommentsState = {
  comments: [],
  commentsLoading: false,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.commentsLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, {payload: categories}) => {
      state.commentsLoading= false;
      state.comments = categories;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.commentsLoading = false;
    });
  }
});

export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsLoading = (state: RootState) => state.comments.commentsLoading;