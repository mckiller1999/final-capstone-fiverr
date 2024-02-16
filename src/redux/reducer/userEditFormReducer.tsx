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


export const {openEditForm,closeEditForm} = userEditFormReducer.actions
export default userEditFormReducer.reducer

