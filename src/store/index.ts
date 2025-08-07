// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import clickReducer from "./clickSlice";

export const store = configureStore({
  reducer: {
    click: clickReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
