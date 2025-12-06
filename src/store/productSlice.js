import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import { BASE_URL } from "../utils/apiUrl";

const initialState = {
  productInfo: {},
  productStatus: STATUS.IDLE,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.pending, (state, _) => {
        state.productStatus = STATUS.LOADING;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.productInfo = action.payload;
        state.productStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchProductDetail.rejected, (state, _) => {
        state.productStatus = STATUS.FAILED;
      });
  },
});

export const fetchProductDetail = createAsyncThunk(
  "product/detail",
  async (productId) => {
    const res = await fetch(`${BASE_URL}/products/${productId}`);
    const product = await res.json();
    return product;
  }
);

export default productSlice.reducer;
