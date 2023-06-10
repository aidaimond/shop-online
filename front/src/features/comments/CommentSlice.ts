import {createSlice} from "@reduxjs/toolkit";
import {Comment} from "../../types";
import {createComments, deleteComments, fetchComments} from "./CommentThunks";
import {RootState} from "../../app/store";


interface CommentsState{
  comments: Comment[];
  commentsLoading: boolean;
  createCommentsLoading: boolean;
  deleteCommentsLoading: boolean;
}

const initialState: CommentsState = {
  comments: [],
  commentsLoading: false,
  createCommentsLoading:false,
  deleteCommentsLoading: false,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.commentsLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, {payload: comments}) => {
      state.commentsLoading= false;
      state.comments = comments;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.commentsLoading = false;
    });

    builder.addCase(createComments.pending, (state) => {
      state.createCommentsLoading = true;
    });
    builder.addCase(createComments.fulfilled, (state) => {
      state.createCommentsLoading = false;
    });
    builder.addCase(createComments.rejected, (state) => {
      state.createCommentsLoading = false;
    });

    builder.addCase(deleteComments.pending, (state) => {
      state.deleteCommentsLoading = true;
    });
    builder.addCase(deleteComments.fulfilled, (state) => {
      state.deleteCommentsLoading = false;
    });
    builder.addCase(deleteComments.rejected, (state) => {
      state.deleteCommentsLoading = false;
    });
  }
});

export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsLoading = (state: RootState) => state.comments.commentsLoading;
export const selectCreateCommentsLoading = (state: RootState) => state.comments.createCommentsLoading;
export const selectDeleteCommentsLoading = (state: RootState) => state.comments.deleteCommentsLoading;
