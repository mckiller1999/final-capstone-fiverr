import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import backdropReducer from "./reducer/backdropReducer";
import userEditFormReducer from "./reducer/userEditFormReducer";
// ...

export const store = configureStore({
  reducer: {
    userReducer,
    backdropReducer,
    userEditFormReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
