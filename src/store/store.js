import { configureStore } from "@reduxjs/toolkit";
import categoryReducers from "./categorySlice";

const store = configureStore({
  reducer: {
    category: categoryReducers,
  },
});

export default store;
