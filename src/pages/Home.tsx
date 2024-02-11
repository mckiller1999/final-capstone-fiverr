import React, { useEffect, useState } from "react";
import ProductJob from "../components/ProductJob";
import { JobModel } from "../models/Jobs";
import axios from "axios";
import { ACCESS_TOKEN_CYBER } from "../util/config";
import {
  DsChiTietLoai,
  DsNhomChiTietLoai,
  JobCategoryModel,
} from "../models/JobDetail";
import ProductJobCat from "./ProductJobCat";

type Props = {};

const Home = (props: Props) => {
  const [arrProduct, setArrProduct] = useState<JobModel[]>([]);
  const [arrProductJob, setArrProductJob] = useState<JobCategoryModel[]>([]);
  console.log(arrProduct);

  const getAllProdApi = async () => {
    try {
      const token = ACCESS_TOKEN_CYBER;
      const res = await axios({
        headers: {
          tokenCybersoft: ` ${token}`,
        },
        url: "https://fiverrnew.cybersoft.edu.vn/api/cong-viec",
        method: "GET",
      });
      //console.log(res);
      setArrProduct(res.data.content);
    } catch (error) {
      console.log("Lỗi khi truy xuất dữ liệu:", error);
    }
  };
  const getAllProdCateApi = async () => {
    try {
      const token = ACCESS_TOKEN_CYBER;
      const res = await axios({
        headers: {
          tokenCybersoft: ` ${token}`,
        },
        url: "https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-menu-loai-cong-viec",
        method: "GET",
      });
      //console.log(res);
      setArrProductJob(res.data.content);
    } catch (error) {
      console.log("Lỗi khi truy xuất dữ liệu:", error);
    }
  };
  useEffect(() => {
    getAllProdApi();
    getAllProdCateApi();
  }, []);
  return (
    <div className=" flex justify-center items-center">
      <div className="container">
        <h3 className=" text-center text-4xl">Fiverr</h3>

        <h3 className=" text-4xl">job by Category </h3>
        <div className="grid grid-rows-5 grid-flow-col gap-4">
          {arrProductJob?.map((prod: JobCategoryModel) => (
            <div className="col-2 m-5" key={prod.id}>
              <ProductJobCat prod={prod} />
            </div>
          ))}
        </div>

        <p className=" font-bold text-4xl">All job</p>
        <div className={`grid grid-rows-8 grid-flow-col gap-4`}>
          {arrProduct?.map((prod: JobModel) => (
            <div className="col-2 m-5" key={prod.id}>
              <ProductJob prod={prod} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
