import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {fetchSubcategories} from "./SubcategoriesThunks";
import {Subcategory} from "../../types";

interface SubcategoriesState {
  subcategories: Subcategory[];
  subcategoriesLoading: boolean;
}

const initialState: SubcategoriesState = {
  subcategories: [],
  subcategoriesLoading: false,
};

export const subcategoriesSlice = createSlice({
  name: "subcategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSubcategories.pending, (state) => {
      state.subcategoriesLoading = true;
    });
    builder.addCase(fetchSubcategories.fulfilled, (state, {payload: subcategories}) => {
      state.subcategoriesLoading = false;
      state.subcategories = subcategories;
    });
    builder.addCase(fetchSubcategories.rejected, (state) => {
      state.subcategoriesLoading = false;
    });
  }
});

export const subcategoriesReducer = subcategoriesSlice.reducer;

export const selectSubcategories = (state: RootState) => state.subcategories.subcategories;
export const selectSubcategoriesLoading = (state: RootState) => state.subcategories.subcategoriesLoading;
