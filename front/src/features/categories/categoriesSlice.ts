import { Category } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchCategories } from './categoriesThunks';

interface CategoriesState {
  categories: Category[];
  categoriesLoading: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  categoriesLoading: false,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.categoriesLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, {payload: categories}) => {
      state.categoriesLoading = false;
      state.categories = categories;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.categoriesLoading = false;
    });
  }
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategoriesLoading = (state: RootState) => state.categories.categoriesLoading;
