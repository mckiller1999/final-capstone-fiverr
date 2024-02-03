import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { UserSignInForm } from "../../pages/Login";
import { Dispatch } from "redux";
import axios from "axios";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_CYBER,
  USERLOGIN,
  getStorageJson,
  saveStorage,
  saveStorageJson,
} from "../../util/config";

import { history } from "../../index";

export interface user {
  email: "";
  name: "";
  id: "";
}

export interface UserLogin {
  tokenUser: "";
  user: user;
}
export interface UserReducerState {
  userLogin: UserLogin | null;
}

const initialState: UserReducerState = {
  userLogin: getStorageJson(USERLOGIN),
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<UserLogin>) => {
      state.userLogin = action.payload;
    },
    logoutAction: (state) => {
      state.userLogin = null;
    },
  },
});

export const { loginAction, logoutAction } = userReducer.actions;

export default userReducer.reducer;

//-------------action async--------------

export const singinActionApi = (userLoginForm: UserSignInForm) => {
  return async (dispatch: AppDispatch) => {
    const token = ACCESS_TOKEN_CYBER;
    try {
      const res = await axios({
        headers: {
          tokenCybersoft: ` ${token}`,
        },
        url: "https://fiverrnew.cybersoft.edu.vn/api/auth/signin",
        method: "POST",
        data: userLoginForm,
      });

      const action = loginAction(res.data.content);
      dispatch(action);
      //localstorge save
      saveStorageJson(USERLOGIN, res.data.content);
      saveStorage(ACCESS_TOKEN, res.data.content.token);
    } catch (error) {
      console.error("Error during login:", error);
      // Xử lý lỗi ở đây nếu cần
    }
  };
};

// Hàm logout dựa trên hàm login
export const logoutActionApi = () => {
  return (dispatch: any) => {
    try {
      // Xóa dữ liệu đăng nhập từ local storage
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(USERLOGIN);

      // Dispatch action logout
      dispatch(logoutAction());

      // Chuyển hướng đến trang login hoặc trang chính (tùy thuộc vào yêu cầu của bạn)
      history.push("/login");
    } catch (err) {
      console.error("Error during logout:", err);
      // Xử lý lỗi ở đây nếu cần
    }
  };
};
