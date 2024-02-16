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

import { setBackDropClose, setBackDropOpen } from "./backdropReducer";

export interface user {
  email: "";
  name: "";
  id: "";
  password: "",
  phone: "",
  birthday: "",
  gender: true,
  role: "",
  skill: [],
  certification: []
}

export interface UserLogin {
  tokenUser: "";
  user: user;
}
export interface UserReducerState {
  userLogin: UserLogin | null;
  userRegister: UserRegister;
}

export interface UserRegister {
  id: number,
  name: string,
  email: string,
  password: string,
  phone: string,
  birthday: string,
  gender: boolean,
  role: string,
  skill: string[]|undefined,
  certification: string[]|undefined,
}

const initialState: UserReducerState = {
  userLogin: getStorageJson(USERLOGIN),
  userRegister: {
  id: 0,
  name: "",
  email: "",
  password: "",
  phone: "",
  birthday: "",
  gender: true,
  role: "",
  skill: [],
  certification: []
  }
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
    registerAction: (state, action: PayloadAction<UserRegister>) => {
      state.userRegister = action.payload;
    }
  },
});

export const { loginAction, logoutAction, registerAction } = userReducer.actions;

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



export const registerApiAction = (userRegister: UserRegister ) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setBackDropOpen())
    const token = ACCESS_TOKEN_CYBER;
    try {
      const res = await axios({
        headers: {
          tokenCybersoft: ` ${token}`,
        },
        url: "https://fiverrnew.cybersoft.edu.vn/api/auth/signup",
        method: "POST",
        data: userRegister,
      })
      localStorage.setItem(ACCESS_TOKEN, res.data.content.accessToken);
      localStorage.setItem(USERLOGIN, JSON.stringify(res.data.content));
      dispatch(registerAction(res.data.content));
      
      alert("Register successfully")
      history.push("/login");
    } catch (err:any) {
      if (err.response?.status === 404) {
        alert("something wrong please try again");
      }
    } finally {
      dispatch(setBackDropClose())
    }
  };
};

