import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ACCESS_TOKEN_CYBER } from "../../util/config";
import axios from "axios";
import { JobModel } from "../../models/Jobs";

interface DataType {
  id: number;
  maCongViec: number;
  maNguoiThue: number;
  ngayThue: string;
  hoanThanh: boolean;
}

const BookingDetil = () => {
  const { id } = useParams<{ id?: string }>();
  console.log(id);
  const [Book, setBook] = useState<DataType | null>(null);
  const [Job, setJob] = useState<JobModel | null>(null);

  const getDetailAPI = async (BookId: string) => {
    try {
      const token = ACCESS_TOKEN_CYBER;
      const res = await axios({
        headers: {
          tokenCybersoft: `${token}`,
        },
        url: `https://fiverrnew.cybersoft.edu.vn/api/thue-cong-viec/${BookId}`,
        method: "GET",
      });
      //console.log(res.data.content);
      setBook(res.data.content);
      // Lấy phần tử đầu tiên trong mảng
    } catch (error) {
      console.log(error);
    }
  };
  const idJob = Book?.maCongViec;
  console.log(idJob);

  const idUser = Book?.maNguoiThue;
  console.log(idUser);
  const getJobAPI = async (JobId: any) => {
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

  const getProfileUserBooking = async (JobId: any) => {
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
      getDetailAPI(id);
      getJobAPI(idJob);
      getProfileUserBooking(idUser);
      // Chuyển JobId về kiểu string trước khi gọi hàm getJobAPI
    }
  }, [id]);
  console.log(Book);
  console.log(Job);
  return (
    <div>
      <h3 className=" font-bold text-2xl py-5 text-center">BookingDetail</h3>
      <div className="container flex flex-col justify-start ">
        <h3 className=" font-bold text-xl">Date Booking:</h3>
        {Book?.ngayThue ? <>{Book?.ngayThue}</> : <div>Emty</div>}
        <h3 className=" font-bold text-xl">Job Name:</h3>

        {Job?.tenCongViec ? <>{Job?.tenCongViec}</> : <div>Emty</div>}
        <h3 className=" font-bold text-xl">Job Done</h3>
        {Book?.hoanThanh ? "Yes" : "No"}
      </div>
    </div>
  );
};

export default BookingDetil;
