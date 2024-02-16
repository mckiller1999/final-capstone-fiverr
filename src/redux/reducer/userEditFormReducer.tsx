import { createSlice } from "@reduxjs/toolkit";

export interface isUserEditOpen {
    isUserEditOpen: boolean,
}


const initialState: isUserEditOpen = {
    isUserEditOpen: true
}

const userEditFormReducer = createSlice({
    name: "userEditFormReducer",
    initialState,
    reducers: {
        openEditForm: (state) => {
            state.isUserEditOpen = true
        },
        closeEditForm: (state) => {
            state.isUserEditOpen = false
        }
    }
})

export default userEditFormReducer.reducer
export const {openEditForm,closeEditForm} = userEditFormReducer.actions