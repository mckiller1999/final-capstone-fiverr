import React, { useEffect, useState } from "react";
import { JobDetail } from "../models/JobDetail";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ACCESS_TOKEN_CYBER } from "../util/config";
import CatogeryTab from "../components/CatogeryTab";
import CardJob from "../components/CardJob";
import { JobModelByName } from "./Search";

type Props = {};

const Detail = (props: Props) => {
  const [productDetail, setProductDetail] = useState<JobModelByName[]>([]);
  const param = useParams();

  const getProductDetailApi = async () => {
    const token = ACCESS_TOKEN_CYBER;
    const res = await axios({
      headers: {
        tokenCybersoft: ` ${token}`,
      },
      url: `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-cong-viec-chi-tiet/${param.id}`,
    });
    setProductDetail(res.data.content);
  };

  useEffect(() => {
    getProductDetailApi();
  }, [param.id]);

  return (
    <div>
      <div>

      </div>
      <div className="container mx-auto mt-5">
        <div className="grid grid-cols-4 gap-4">
          {productDetail?.map((prod: JobModelByName) => (
            <div className="m-5" key={prod.id}>
              <CardJob prod={prod.congViec} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
