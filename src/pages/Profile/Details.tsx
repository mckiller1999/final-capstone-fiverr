import { useParams } from "react-router-dom";

import URL from "../../constants/url";
import { useDispatch, useSelector } from "react-redux";
import { setJobDetail } from "../../redux/reducer/jobDetailReducer";
import BreadcrumbComponent from "../../components/Breadcrumb";
import ShowJobDetails from "../../components/ShowJobDetails";
import AddComment from "../../components/AddComment";
import HiredJobComplete from "../../components/HiredJobComplete";
import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";

const Details = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { data } = useAxios({ url: URL.JOB_DETAIL(param?.id), method: "get" });
  dispatch(setJobDetail(data));
  const showComment = useSelector(
    (state: any) => state?.isLoadingReducer?.showing
  );
  //console.log(showComment);

  return data ? (
    <div>
      <div className="ml-5 mt-5">
        <BreadcrumbComponent />
      </div>
      <div className="container mx-auto mt-3 flex">
        <div className="w-1/2">
          <ShowJobDetails />
        </div>
        <div className="w-1/2 mx-auto">
          <HiredJobComplete />
        </div>
      </div>
      <div></div>
    </div>
  ) : null;
};

export default Details;
