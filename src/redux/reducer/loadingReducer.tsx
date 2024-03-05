import { createSlice } from "@reduxjs/toolkit";

export interface loadingState {
    loading: boolean, 
    showing: boolean
};

const initialState: loadingState = {
    loading: false,
    showing:false
};

const loadingReducer = createSlice({
    name: "loadingReducer",
    initialState,
    reducers: {
        setLoading: (state,action) => {
            state.loading = !!action?.payload
        }, 
        setShowing: (state,action) => {
            state.showing = !!action?.payload
        },       
    }
})

export const {setLoading, setShowing} = loadingReducer.actions
export default loadingReducer.reducer
