import React from "react";
import CardJob from "../../components/CardJob";
import { JobModelByName } from "../Search";
import useAxios from "../../hooks/useAxios";
import URL from "../../constants/url";
import { useParams } from "react-router-dom";

const JobView = () => {
  const param = useParams();
  const { data } = useAxios({
    url: URL.JOB_SEARCH_ID(param.id),
    method: "get",
  });

  return data ? (
    <div className="container mx-auto my-3">
      <div className="flex flex-col justify-center items-center md:flex-row md:flex-wrap">
        {data.map((prod: JobModelByName) => (
          <div className="m-5" key={prod.id}>
            <CardJob prod={prod} />
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default JobView;
