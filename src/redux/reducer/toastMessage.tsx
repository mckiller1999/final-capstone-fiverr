import { createSlice } from "@reduxjs/toolkit";

export interface toastMessageOpen {
  isToastMessageOpen: boolean;
}

const initialState: toastMessageOpen = {
    isToastMessageOpen: false,
};

const toastMessageReducer = createSlice({
  name: "toastMessageReducer",
  initialState,
  reducers: {
    setToastOpen: (state) => {
      state.isToastMessageOpen = true;
    },
    setToastClose: (state) => {
      state.isToastMessageOpen = false;
    },
  },
});

export const { setToastOpen, setToastClose } = toastMessageReducer.actions;
export default toastMessageReducer.reducer;
