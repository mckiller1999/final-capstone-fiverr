import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ACCESS_TOKEN_CYBER } from "../util/config";
import CardJob from "../components/CardJob";
import { JobModelByName } from "./Search";
import BreadcrumbComponent from "../components/Breadcrumb";

type Props = {};

const Detail = (props: Props) => {
  const [productDetail, setProductDetail] = useState<JobModelByName[]>([]);
  const param = useParams();

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
  }, [param.id]);

  console.log(productDetail);

  return (
    <div>
      <div className="ml-5 mt-5">
          <BreadcrumbComponent/>
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
