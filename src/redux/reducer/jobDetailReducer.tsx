import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { JobModel } from "../../models/Jobs";

export interface JobDetails {
    avatar: string,
    id: string,
    tenChiTietLoai: string,
    tenLoaiCongViec: string,
    tenNguoiTao: string,
    tenNhomChiTietLoai: string,
    congViec: JobModel | [],
};

export interface JobDetailReducerState {
    jobDetail : JobDetails,
    jobHired: {
        congViec : [],
        hoanThanh: boolean,
        id: number,
        ngayThue: "",
    }
};

const initialState: JobDetailReducerState = {
    jobDetail: {
        avatar: "",
        id: "",
        tenChiTietLoai: "",
        tenLoaiCongViec: "",
        tenNguoiTao: "",
        tenNhomChiTietLoai: "",
        congViec: [],
    },
    jobHired: {
        congViec:[],
        hoanThanh:false,
        id: 0,
        ngayThue: ''
    }
};

const jobDetailReducer = createSlice({
    name: "jobDtailReducer",
    initialState,
    reducers: {
        setJobDetail: (state, action: PayloadAction<JobDetails>) => {
            state.jobDetail = action?.payload
        },
        setJobHired: (state, action) => {
            state.jobHired = action.payload
        }
    }
})

export const { setJobDetail, setJobHired } = jobDetailReducer.actions
export default jobDetailReducer.reducer
