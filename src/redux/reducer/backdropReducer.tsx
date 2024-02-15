import { createSlice } from "@reduxjs/toolkit";

export interface BackDropOpen {
  isBackDropOpen: boolean;
}

const initialState: BackDropOpen = {
  isBackDropOpen: false,
};

const backDropReducer = createSlice({
  name: "backDropReducer",
  initialState,
  reducers: {
    setBackDropOpen: (state) => {
      state.isBackDropOpen = true;
    },
    setBackDropClose: (state) => {
      state.isBackDropOpen = false;
    },
  },
});

export const { setBackDropOpen, setBackDropClose } = backDropReducer.actions;
export default backDropReducer.reducer;
