import { Category } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {fetchSubcategories} from "./SubcategoriesThunks";

interface SubcategoriesState {
  subcategories: Category[];
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
    builder.addCase(fetchSubcategories.fulfilled, (state, {payload: categories}) => {
      state.subcategoriesLoading = false;
      state.subcategories = categories;
    });
    builder.addCase(fetchSubcategories.rejected, (state) => {
      state.subcategoriesLoading = false;
    });
  }
});

export const subcategoriesReducer = subcategoriesSlice.reducer;

export const selectSubcategories = (state: RootState) => state.categories.categories;
export const selectSubcategoriesLoading = (state: RootState) => state.categories.categoriesLoading;
