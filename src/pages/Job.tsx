import React, { useEffect, useState } from "react";
import { JobModel } from "../models/Jobs";
import axios from "axios";
import { ACCESS_TOKEN_CYBER } from "../util/config";
import CatogeryTab from "../components/CatogeryTab";
import CardJob from "../components/CardJob";

type Props = {};

const Job = (props: Props) => {
  const [arrProduct, setArrProduct] = useState<JobModel[]>([]);
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

  useEffect(() => {
    getAllProdApi();
  }, []);
  return <div>
    <div>
      <CatogeryTab />
    </div>
    <div className="container mx-auto mt-5">
      <div className="grid grid-cols-4 gap-4">
        {arrProduct?.map((prod: JobModel) => (
          <div className="m-5" key={prod.id}>
            <CardJob prod={prod} />
          </div>
        ))}
      </div>
    </div>
  </div>;
};

export default Job;
