import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { closeRegisterForm } from "./registerFormReducer";

export interface isLoginFormOpen {
    loginFormOpen: boolean, 
}

const initialState: isLoginFormOpen = {
    loginFormOpen: true
}



const loginFormReducer = createSlice({
    name: "loginFormReducer",
    initialState,
    reducers: {
        openLoginForm: (state) => {
            state.loginFormOpen = true
        },
        closeLoginForm: (state) => {
            state.loginFormOpen = false
        }
    }
})

export const {openLoginForm,closeLoginForm} = loginFormReducer.actions
export default loginFormReducer.reducer
