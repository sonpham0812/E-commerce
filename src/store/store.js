import { configureStore } from "@reduxjs/toolkit";
import categoryReducers from "./categorySlice";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";

const store = configureStore({
  reducer: {
    category: categoryReducers,
    cart: cartReducer,
    product: productReducer,
  },
});

export default store;
