import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ACCESS_TOKEN_CYBER } from "../../util/config";
import { Rate } from "antd";

interface DataType {
  id: string;
  tenCongViec: string;
  giaTien: string;
  danhGia: string;
  saoCongViec: number;
  hinhAnh: string;
  moTa: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id?: string }>();
  const [job, setJob] = useState<DataType | null>(null);

  const getJobAPI = async (JobId: string) => {
    try {
      const token = ACCESS_TOKEN_CYBER;
      const res = await axios({
        headers: {
          tokenCybersoft: `${token}`,
        },
        url: `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/${JobId}`,
        method: "GET",
      });
      setJob(res.data.content); // Lấy phần tử đầu tiên trong mảng
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getJobAPI(id);
    }
  }, [id]);

  if (!job) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-4xl text-center font-extrabold">
        {" "}
        {job.tenCongViec}
      </h2>
      <div className="flex justify-center content-center my-5 gap-20">
        <img src={job.hinhAnh} alt="" />
        <div>
          <div>Giá tiền: {job.giaTien}</div>
          <div>Đánh giá: {job.danhGia}</div>
          <Rate disabled allowHalf defaultValue={job.saoCongViec} />
        </div>
      </div>

      <p className="text-3xl underline">Detail:</p>
      <p className="text-2xl">{job.moTa}</p>
    </div>
  );
};

export default ProductDetail;
