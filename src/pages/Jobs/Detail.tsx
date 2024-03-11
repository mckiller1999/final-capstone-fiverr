import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import URL from "../../constants/url";
import { useDispatch } from "react-redux";
import { setJobDetail } from "../../redux/reducer/jobDetailReducer";
import BreadcrumbComponent from "../../components/Breadcrumb";
import ShowJobDetails from "../../components/ShowJobDetails";
import CardRentJobs from "../../components/CardRentJobs";
import Comment from "../../components/Comment";

const Detail = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { data } = useAxios({ url: URL.JOB_DETAIL(param?.id), method: 'get' });
  dispatch(setJobDetail(data));

  return data ? (
    <div className="max-w-7xl mx-auto">
      <div className="ml-5 mt-5">
        <BreadcrumbComponent />
      </div>
      <div className="container mx-auto mt-3 flex">
        <div className="w-1/2">
          <ShowJobDetails />
        </div>
        <div className="w-1/2 mx-auto">
          <CardRentJobs />
        </div>
      </div>
      <div>
        <Comment />
      </div>
    </div>
  ) : null;
};

export default Detail;
