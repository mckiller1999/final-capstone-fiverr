import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { JobModel } from "../models/Jobs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import { DsNhomChiTietLoai, DsChiTietLoai } from "../models/JobDetail";

import { ACCESS_TOKEN_CYBER } from "../util/config";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { GetProp, UploadProps } from "antd";
import { createJobActionApi } from "../redux/reducer/createJobReducer";
import { notify } from "../constants/alert";

export interface CreateJobProps {
  onCreateJob: (newJob: JobModel) => void;
}
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const CreateJob: React.FC<CreateJobProps> = ({ onCreateJob }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const idUser = userLogin?.user.id;

  const nguoiTaoValue = idUser ? Number(idUser) : 0;
  const [newJob, setNewJob] = useState<JobModel>({
    id: 0,
    tenCongViec: "",
    danhGia: 0,
    giaTien: 0,
    nguoiTao: nguoiTaoValue,
    hinhAnh: "",
    moTa: "",
    maChiTietLoaiCongViec: 0,
    moTaNgan: "",
    saoCongViec: 0,
  });
  const [JobCategory, setJobCategory] = useState<DsNhomChiTietLoai[]>([]);
  const [JobCate, setJobCate] = useState<DsChiTietLoai[]>([]);

  const getsetJobCategoryApi = async () => {
    try {
      const token = ACCESS_TOKEN_CYBER;
      const res = await axios({
        headers: {
          tokenCybersoft: ` ${token}`,
        },
        url: `https://fiverrnew.cybersoft.edu.vn/api/chi-tiet-loai-cong-viec`,
      });

      // Sử dụng flatMap để lấy tất cả các giá trị dsChiTietLoai từ mỗi phần tử trong JobCategory
      const tempJobCate: DsChiTietLoai[] = res.data.content.flatMap(
        (cate: DsNhomChiTietLoai) => cate.dsChiTietLoai
      );

      // Set JobCate thành mảng đã được kết hợp từ tất cả các giá trị dsChiTietLoai
      setJobCate(tempJobCate);

      console.log(JobCategory);
      console.log(JobCate);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getsetJobCategoryApi();
    //console.log(JobCategory);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Kiểm tra nếu trường là "danhGia" hoặc "giaTien" hoặc "saoCongViec", thì chuyển đổi kiểu dữ liệu thành number
    const numericValue = ["danhGia", "giaTien", "saoCongViec"].includes(name)
      ? parseInt(value, 10)
      : value;

    setNewJob({ ...newJob, [name]: numericValue });
  };
  const handleSelectChange = (e: SelectChangeEvent<string | number>) => {
    const value =
      typeof e.target.value === "string"
        ? parseInt(e.target.value, 10)
        : e.target.value;
    setNewJob({ ...newJob, maChiTietLoaiCongViec: value });
  };

  const handleChangePict: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);

        // Update newJob with the image URL
        setNewJob({
          ...newJob,
          hinhAnh: url,
        });
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createJobActionApi(newJob) as any);
    // Log the image URL when submitting the form
    console.log("Image URL:", newJob.hinhAnh);

    // Reset form after submission
    setNewJob({
      id: 0,
      tenCongViec: "",
      danhGia: 0,
      giaTien: 0,
      nguoiTao: nguoiTaoValue,
      hinhAnh: "", // Reset the image URL
      moTa: "",
      maChiTietLoaiCongViec: 0,
      moTaNgan: "",
      saoCongViec: 0,
    });
    console.log(newJob);
    notify("success", "Hired Successfully");
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className="py-14">
      <form
        onSubmit={handleSubmit}
        className="p-2 sm:flex sm:flex-col justify-evenly md:flex md:flex-row justify-evenly"
      >
        <div className="flex flex-col">
          <h3 style={{ fontSize: "32px", fontWeight: "bold" }}>
            Create a job, find the new World
          </h3>
          <TextField
            label="Tên công việc"
            name="tenCongViec"
            value={newJob.tenCongViec}
            onChange={handleChange}
            required
            className="sm:w-96"
            sx={{ width: "40ch" }}
            margin="normal"
          />
          <TextField
            label="Đánh giá"
            name="danhGia"
            type="number"
            value={newJob.danhGia}
            onChange={handleChange}
            required
            sx={{ width: "40ch" }}
            margin="normal"
          />
          <TextField
            label="Giá tiền"
            name="giaTien"
            type="number"
            value={newJob.giaTien}
            onChange={handleChange}
            required
            sx={{ width: "40ch" }}
            margin="normal"
          />

          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUpload}
            onChange={handleChangePict}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "50%" }} />
            ) : (
              uploadButton
            )}{" "}
          </Upload>
        </div>
        <div className="flex flex-col">
          <TextField
            label="Mô tả"
            name="moTa"
            multiline
            rows={4}
            value={newJob.moTa}
            onChange={handleChange}
            required
            sx={{ width: "40ch" }}
            margin="normal"
          />
          <InputLabel id="demo-simple-select-label">Type of job</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newJob.maChiTietLoaiCongViec}
            label="Type of job"
            sx={{ width: "40ch" }}
            onChange={handleSelectChange}
          >
            {JobCate.map((cate) => (
              <MenuItem key={cate.id} value={cate.id}>
                {cate.tenChiTiet}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Mô tả ngắn"
            name="moTaNgan"
            value={newJob.moTaNgan}
            onChange={handleChange}
            required
            sx={{ width: "40ch" }}
            margin="normal"
          />
          <TextField
            label="Sao công việc"
            name="saoCongViec"
            type="number"
            value={newJob.saoCongViec}
            onChange={handleChange}
            required
            sx={{ width: "40ch" }}
            margin="normal"
          />
          <Button
            sx={{ width: "40ch" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Tạo công việc
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;
