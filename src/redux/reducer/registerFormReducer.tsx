import { createSlice } from "@reduxjs/toolkit";

export interface isRegisterFormOpen {
    registerFormOpen: boolean, 
}

const initialState: isRegisterFormOpen = {
    registerFormOpen: false
}

const registerFormReducer = createSlice({
    name: "registerFormReducer",
    initialState,
    reducers: {
        openRegisterForm: (state) => {
            state.registerFormOpen = true
        },
        closeRegisterForm: (state) => {
            state.registerFormOpen = false
        }
    }
})

export const {openRegisterForm,closeRegisterForm} = registerFormReducer.actions
export default registerFormReducer.reducer
