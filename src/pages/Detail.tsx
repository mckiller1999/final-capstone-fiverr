import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ACCESS_TOKEN_CYBER, getStorageJson } from "../util/config";
import { JobModelByName } from "./Search";
import BreadcrumbComponent from "../components/Breadcrumb";

import CardRentJob from "../components/CardRentJobs";
import ShowJobDetails from "../components/ShowJobDetails";
import Comment from "../components/Comment";

type Props = {};

const Detail = (props: Props) => {
  const [productDetail, setProductDetail] = useState<JobModelByName[]>(getStorageJson('dataJobDetail'));
  const param = useParams();
console.log(productDetail);

  const getProductDetailApi = async () => {
    try {
      const token = ACCESS_TOKEN_CYBER;
      const res = await axios({
        headers: {
          tokenCybersoft: ` ${token}`,
        },
        url: `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-cong-viec-chi-tiet/${param.id}`,
      });
      setProductDetail(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetailApi();
  }, [param]);

  return (
    <div>
      <div className="ml-5 mt-5">
        <BreadcrumbComponent prod={productDetail}/>
      </div>
      <div className="container mx-auto mt-3 flex">
        <div className="w-1/2">
          <ShowJobDetails prod={productDetail}/>
        </div>
        <div className="w-1/2 mx-auto">
          <CardRentJob prod={productDetail}/>
        </div>
      </div>
      <div>
        <Comment prod={productDetail}/>
      </div>
    </div>
  );
};

export default Detail;
