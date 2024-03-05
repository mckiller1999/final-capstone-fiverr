import { Button, Typography } from "@mui/material";
import { Avatar, Space, Rate } from "antd";
import { useSelector } from "react-redux";

const ShowJobDetails = () => {
  const jobDetail = useSelector((state:any)=>state?.jobDetailReducer?.jobDetail);

  const checkRate = (value: Number) => {
    if (value === 5) {
      return <span className="text-yellow-700 font-bold">Top Rated</span>;
    } else {
      return "";
    }
  };
  const text = jobDetail[0].congViec.moTa.split('\r\n');

  return (
    <div className="container mx-auto mt-5">
      <div>
        <h2 className="text-2xl text-gray-800 font-bold">
          {jobDetail[0].congViec.tenCongViec}
        </h2>
      </div>
      <div className="flex my-3">
        <Space direction="vertical" size={16}>
          <Space wrap size={10}>
            <Avatar size={50} src={jobDetail[0].avatar} />
            <span className="font-bold">{jobDetail[0].tenNguoiTao}</span>
            {checkRate(jobDetail[0].congViec.saoCongViec)}
            <div className="flex border-l-2 border-gray-400 pl-2">
              <Rate disabled value={jobDetail[0].congViec.saoCongViec} />
              <span className="ml-2 text-gray-600">({jobDetail[0].congViec.danhGia})</span>
            </div>
          </Space>
        </Space>
      </div>
      <hr className="font-bold border-gray-400" />
      <div className="mt-5 pt-3 mx-auto">
        <img src={jobDetail[0].congViec.hinhAnh} alt="imageproduct" className="w-full" />
      </div>
      <div className="mt-5">
        <h1 className="text-xl text-gray-600 font-bold mb-3">About This Gig</h1>
        <div>
          {text?.map((string: any) => (
            <Typography key={string} color={"GrayText"} className="pt-1">{string}</Typography>
          ))}
        </div>
      </div>
      <div className="my-5">
        <h1 className="text-xl text-gray-600 font-bold mb-3">
          About The Seller
        </h1>
        <div className="flex">
          <Avatar size={100} src={jobDetail[0].avatar} />
          <div className="ml-5">
            <div className="flex">
              <span className="font-bold mr-2">{jobDetail[0].tenNguoiTao}</span>
              {checkRate(jobDetail[0].congViec.saoCongViec)}
            </div>
            <div className="flex my-3">
              <Rate disabled value={jobDetail[0].congViec.saoCongViec} />
              <span className="ml-2 text-gray-600">({jobDetail[0].congViec.danhGia})</span>
            </div>
            <Button variant="outlined">Contact Me</Button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ShowJobDetails;
