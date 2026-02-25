import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import newsReducer from "./newsSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    news: newsReducer,
  },
});
