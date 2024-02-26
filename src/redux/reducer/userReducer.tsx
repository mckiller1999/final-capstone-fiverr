import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { UserSignInForm } from "../../pages/Login";
// import { Dispatch } from "redux";
import axios from "axios";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_CYBER,
  USERLOGIN,
  getStorageJson,
  http,
  saveStorage,
  saveStorageJson,
} from "../../util/config";

import { history } from "../../index";
// import { Alert } from "@mui/material";
import { setBackDropClose, setBackDropOpen } from "./backdropReducer";
// import { useDispatch } from "react-redux";
import { closeEditForm } from "./userEditFormReducer";
import { openLoginForm } from "./loginFormReducer";
import { closeRegisterForm } from "./registerFormReducer";
import { setToastOpen } from "./toastMessage";

export interface user {
  email: "";
  name: "";
  id: "";
  password: "",
  phone: "",
  birthday: "",
  gender: boolean,
  role: "",
  skill: string[],
  certification: string[]
}

export interface UserLogin {
  tokenUser: "";
  user: user;
}

export interface UserReducerState {
  userLogin: UserLogin | null;
  userRegister: UserRegister;
  // userEdit: user;
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
  },
  // userEdit: {
    
  //     email: "",
  // name: "",
  // id: "",
  // password: "",
  // phone: "",
  // birthday: "",
  // gender: true,
  // role: "",
  // skill: [],
  // certification: []
  //   }
  
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
    },
    updateProfileAction: (state, action: PayloadAction<user>) => {
      if (state.userLogin) {
        state.userLogin.user = action.payload;
      }
    }
  },
});

export const { loginAction, logoutAction, registerAction, updateProfileAction } = userReducer.actions;

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
      history.push("/")
    } catch (error) {
      alert("Error during login:")
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
      
      // alert("Register successfully")
      dispatch(closeRegisterForm());
      dispatch(setToastOpen());
    } catch (err:any) {
      if (err.response?.status === 404) {
        alert("something wrong please try again");
      }
    } finally {
      dispatch(setBackDropClose())
    }
  };
};


export const updateUserProfile = (userData: user) => {
  return async (dispatch:AppDispatch) => {
    console.log("dataput", userData)
    dispatch(setBackDropOpen())
    const token = ACCESS_TOKEN_CYBER;
    try {
      const res = await axios({
        headers: {
          tokenCybersoft: ` ${token}`,
        },
        url: `https://fiverrnew.cybersoft.edu.vn/api/users/${userData.id}`,
        method: "PUT",
        data: userData,
      })
      alert("Your profile has been updated successfully")

      const updateProfileLatest = await axios({
        headers: {
          tokenCybersoft: ` ${token}`,
        },
        url: `https://fiverrnew.cybersoft.edu.vn/api/users/${userData.id}`,
        method: "GET",
      })

      // console.log(res.data.content) --> result coming with array being merged
      console.log("updateProfileLatest.data.content", updateProfileLatest.data.content)
      dispatch(updateProfileAction(updateProfileLatest.data.content))
      // dispatch(closeEditForm())
    } catch (err) {
      alert(err)
    } finally {
      dispatch(setBackDropClose())
    }
  }
}


