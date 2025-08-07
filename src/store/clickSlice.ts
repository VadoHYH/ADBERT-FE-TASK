// clickSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  disabled: false,
};

const clickSlice = createSlice({
  name: "click",
  initialState,
  reducers: {
    increment: (state) => {
      if (!state.disabled) {
        state.count += 1;
      }
    },
    clear: (state) => {
      state.count = 0;
    },
    toggleDisable: (state) => {
      state.disabled = !state.disabled;
    },
  },
});

export const { increment, clear, toggleDisable } = clickSlice.actions;
export default clickSlice.reducer;
