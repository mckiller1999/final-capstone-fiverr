import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import backdropReducer from "./reducer/backdropReducer";
import userEditFormReducer from "./reducer/userEditFormReducer";
import loginFormReducer from "./reducer/loginFormReducer";
import registerFormReducer from "./reducer/registerFormReducer";
import toastMessage from "./reducer/toastMessage";
import loadingReducer from "./reducer/loadingReducer";
import jobDetailReducer from "./reducer/jobDetailReducer";
// ...

export const store = configureStore({
  reducer: {
    userReducer,
    backdropReducer,
    userEditFormReducer,
    loginFormReducer,
    registerFormReducer,
    toastMessage,
    loadingReducer,
    jobDetailReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
