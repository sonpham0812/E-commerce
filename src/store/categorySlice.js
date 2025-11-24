import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import { BASE_URL } from "../utils/apiUrl";

const initialState = {
  categoryList: [],
  categoriesStatus: STATUS.IDLE,
  categoryProducts: [],
  productsStatus: STATUS.IDLE,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryList.pending, (state, _) => {
        state.categoriesStatus = STATUS.LOADING;
      })
      .addCase(fetchCategoryList.fulfilled, (state, action) => {
        state.categoryList = action.payload;
        state.categoriesStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchCategoryList.rejected, (state, _) => {
        state.categoriesStatus = STATUS.FAILED;
      });
  },
});

export const fetchCategoryList = createAsyncThunk("category/all", async () => {
  const res = await fetch(`${BASE_URL}/products/categories`);
  const categoryList = await res.json();
  return categoryList;
});

export const getCategoryList = (state) => state.category.categoryList;
export default categorySlice.reducer;
