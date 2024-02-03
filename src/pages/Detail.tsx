import React, { useEffect, useState } from "react";
import { JobDetail } from "../models/JobDetail";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ACCESS_TOKEN_CYBER } from "../util/config";

type Props = {};

const Detail = (props: Props) => {
  const [productDetail, setProductDetail] = useState<JobDetail | null>(null);
  const param = useParams();

  const getProductDetailApi = async () => {
    const token = ACCESS_TOKEN_CYBER;
    const res = await axios({
      headers: {
        tokenCybersoft: ` ${token}`,
      },
      url: `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/${param.id}`,
    });
    setProductDetail(res.data.content);
  };

  useEffect(() => {
    getProductDetailApi();
  }, []);
  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4">
      <div className="row-span-3 ...">
        <img src={productDetail?.hinhAnh} alt="" />
      </div>
      <div className="col-span-2 ...">{productDetail?.tenCongViec}</div>
      <div className="row-span-2 col-span-2 ...">{productDetail?.moTa}</div>
    </div>
  );
};

export default Detail;
