import {Brand} from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {fetchBrands} from "./brandsThunks";

interface BrandsState {
  brands: Brand[];
  brandsLoading: boolean;
}

const initialState: BrandsState = {
  brands: [],
  brandsLoading: false,
};

export const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBrands.pending, (state) => {
      state.brandsLoading = true;
    });
    builder.addCase(fetchBrands.fulfilled, (state, {payload: categories}) => {
      state.brandsLoading = false;
      state.brands = categories;
    });
    builder.addCase(fetchBrands.rejected, (state) => {
      state.brandsLoading = false;
    });
  }
});

export const brandsReducer = brandsSlice.reducer;

export const selectBrands = (state: RootState) => state.brands.brands;
export const selectBrandsLoading = (state: RootState) => state.brands.brandsLoading;