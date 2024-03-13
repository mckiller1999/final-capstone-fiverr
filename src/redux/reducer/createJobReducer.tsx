import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch } from "../store";
import {
  ACCESS_TOKEN_CYBER,
  getTokenFromLocalStorage,
} from "../../util/config";
import axios from "axios";
import { JobModel } from "../../models/Jobs";
import { notify } from "../../constants/alert";

export interface JobReducerState {
  createJob: JobModel;
}

const initialState: JobReducerState = {
  createJob: {
    id: 0,
    tenCongViec: "",
    danhGia: 0,
    giaTien: 0,
    nguoiTao: 0,
    hinhAnh: "",
    moTa: "",
    maChiTietLoaiCongViec: 0,
    moTaNgan: "",
    saoCongViec: 0,
  },
};

const createJobReducer = createSlice({
  name: "createJob",
  initialState,
  reducers: {
    createJobAction: (state, action: PayloadAction<JobModel>) => {
      // Thực hiện cập nhật state dựa trên dữ liệu từ action
      state.createJob = action.payload;
    },
  },
});

export const { createJobAction } = createJobReducer.actions;

export default createJobReducer.reducer;

export const createJobActionApi = (createJobForm: JobModel) => {
  return async (dispatch: AppDispatch) => {
    const token = ACCESS_TOKEN_CYBER;

    const tokenUser = getTokenFromLocalStorage();
    //console.log(token);

    try {
      const res = await axios({
        headers: {
          token: `${tokenUser}`,
          tokenCybersoft: ` ${token}`,
        },
        url: "https://fiverrnew.cybersoft.edu.vn/api/cong-viec",
        method: "POST",
        data: createJobForm,
      });

      // Dispatch action để cập nhật state
      dispatch(createJobAction(res.data.content));
      notify("success", "Create Job Successfully!");
      //localstorge save
    } catch (error) {
      notify("error", "Create Fail, please try again!");
      console.error("Error during login:", error);
      // Xử lý lỗi ở đây nếu cần
    }
  };
};
