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
      })
      .addCase(fetchProductsByCategory.pending, (state, _) => {
        state.productsStatus = STATUS.LOADING;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.categoryProducts = action.payload;
        state.productsStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchProductsByCategory.rejected, (state, _) => {
        state.productsStatus = STATUS.FAILED;
      })
      .addCase(fetchLimitProduct.pending, (state, _) => {
        state.productsStatus = STATUS.LOADING;
      })
      .addCase(fetchLimitProduct.fulfilled, (state, action) => {
        state.categoryProducts = action.payload;
        state.productsStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchLimitProduct.rejected, (state, _) => {
        state.productsStatus = STATUS.FAILED;
      });
  },
});

export const fetchCategoryList = createAsyncThunk("category/all", async () => {
  const res = await fetch(`${BASE_URL}/products/categories`);
  const categoryList = await res.json();
  return categoryList;
});

export const fetchProductsByCategory = createAsyncThunk(
  "category/products",
  async (category) => {
    const res = await fetch(`${BASE_URL}/products/category/${category}`);
    const products = await res.json();
    return products;
  }
);

export const fetchLimitProduct = createAsyncThunk(
  "category/product/limit",
  async ({ category, limit }) => {
    const res = await fetch(
      `${BASE_URL}/products/category/${category}?limit=${limit}`
    );
    const products = await res.json();
    return products;
  }
);

export const getCategoryList = (state) => state.category.categoryList;
export const getProductsList = (state) => state.category.categoryProducts;
export default categorySlice.reducer;
