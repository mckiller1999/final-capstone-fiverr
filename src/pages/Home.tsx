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
import Slider from "react-slick";
import type { SearchProps } from "antd/es/input/Search";
import { Carousel, Input } from "antd";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutlined } from "@mui/icons-material";

type Props = {};
const { Search } = Input;

const Home = (props: Props) => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const navigate = useNavigate();
  const frm = useFormik({
    initialValues: {
      keyword: "",
    },
    onSubmit: ({ keyword }) => {
      //history.push(`/search?keyword=${keyword}`)
      navigate(`/search?keyword=${keyword}`);
    },
  });

  const frmType = useFormik({
    initialValues: {
      keyword: "",
    },
    onSubmit: ({ keyword }) => {
      //history.push(`/search?keyword=${keyword}`)
      navigate(`/search-cate?keyword=${keyword}`);
    },
  });

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    frm.handleSubmit();
  };
  const [arrProduct, setArrProduct] = useState<JobModel[]>([]);
  const [arrProductJob, setArrProductJob] = useState<JobCategoryModel[]>([]);
  //console.log(arrProduct);
  let settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
  };

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

  const handleCardClick = (key: string) => {
    frmType.setFieldValue("keyword", key);
    frmType.handleSubmit();
  };

  return (
    <div className=" flex justify-center items-center flex-col">
      <div style={{ maxWidth: "99vw" }}>
        <div
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            top: 200,
            left: 50,
            zIndex: 100,
          }}
          className=""
        >
          <h1 style={{ color: "#fff", fontSize: "45px", fontWeight: "bold" }}>
            Find the right freelance
            <br />
            service, right away
          </h1>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            maxLength={20}
            name="keyword"
            onChange={frm.handleChange}
            value={frm.values.keyword}
          />
        </div>
        <Carousel autoplay fade>
          <div>
            <div
              style={{
                background: "#0d4127",
                lineHeight: "160px",
                textAlign: "center",
                width: "100%",
                height: "660px",
                color: "#fff",
              }}
            >
              <img
                style={{
                  position: "fixed",
                  bottom: -100,
                  left: 1400,
                  width: 550,
                  height: 650,
                }}
                src="./img/man1.png"
                alt="logo"
              />
            </div>
          </div>
          <div>
            {" "}
            <div
              style={{
                background: "#a9465b",
                lineHeight: "160px",
                textAlign: "center",
                width: "100%",
                height: "660px",
                color: "#fff",
              }}
            >
              <img
                style={{ position: "fixed", bottom: 0, left: 1300 }}
                width={750}
                height={750}
                src="./img/man2.png"
                alt="logo"
              />
            </div>
          </div>
          <div>
            {" "}
            <div
              style={{
                background: "#5f1629",
                lineHeight: "160px",
                textAlign: "center",
                width: "100%",
                height: "660px",
                color: "#fff",
              }}
            >
              <img
                style={{
                  position: "fixed",
                  bottom: 0,
                  left: 1400,
                  width: 550,
                  height: 550,
                }}
                src="./img/mn3.png"
                alt="logo"
              />
            </div>
          </div>
          <div>
            {" "}
            <div
              style={{
                background: "#118625",
                lineHeight: "160px",
                textAlign: "center",
                width: "100%",
                height: "660px",
                color: "#118625",
              }}
            >
              <img
                style={{
                  position: "fixed",
                  bottom: 0,
                  left: 1400,
                  width: 550,
                  height: 550,
                }}
                src="./img/woman1.png"
                alt="logo"
              />
              4
            </div>
          </div>
        </Carousel>
      </div>
      <div
        className="container bg-blue-gray-100 flex justify-center items-center "
        style={{ height: 100, maxWidth: "100vw" }}
      >
        <p style={{ color: "#b5b6ba", fontWeight: "bold" }}>Trusted by:</p>
        <div className=" flex">
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png"
            width={50}
            height={50}
            className="mx-5"
            alt=""
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png"
            width={50}
            height={50}
            className="mx-5"
            alt=""
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png"
            width={50}
            height={50}
            className="mx-5"
            alt=""
          />
          <img
            src="./img/pnglogo.png"
            width={50}
            height={50}
            className="mx-5"
            alt=""
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png"
            width={50}
            height={50}
            className="mx-5"
            alt=""
          />
        </div>
      </div>

      <div className=" mt-20">
        <div className="container my-4">
          <h3 className=" font-bold text-4xl">Popular professional services</h3>
          <div style={{ maxWidth: "100vw" }}>
            <Slider {...settings}>
              {arrProductJob?.map((prod: JobCategoryModel) => (
                <div className="" key={prod.id}>
                  <ProductJobCat prod={prod} onCardClick={handleCardClick} />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="container">
          <div className={`grid grid-rows-8 grid-flow-col gap-4`}>
            {/* {arrProduct?.map((prod: JobModel) => (
              <div className="col-2 m-5" key={prod.id}>
                <ProductJob prod={prod} />
              </div>
            ))} */}
          </div>
        </div>
      </div>
      <div
        className="container bg-blue-50 flex justify-center items-center "
        style={{ height: 600, maxWidth: "100vw" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-3 w-80">
            <h1 className="text-3xl font-bold">The best part? Everything.</h1>
            <ul className="space-y-3">
              <li>
                <h3 className=" text-xl font-bold">
                  <CheckCircleOutlined />
                  Stick to your budget
                </h3>
                <p>
                  Find the right service for every price point. No hourly rates,
                  just project-based pricing.
                </p>
              </li>
              <li>
                <h3 className=" text-xl font-bold">
                  <CheckCircleOutlined />
                  Get quality work done quickly{" "}
                </h3>
                <p>
                  Find the right service for every price point. No hourly rates,
                  just project-based pricing.
                </p>
              </li>
              <li>
                <h3 className=" text-xl font-bold">
                  <CheckCircleOutlined />
                  Pay when you're happy
                </h3>
                <p>
                  Upfront quotes mean no surprises. Payments only get released
                  when you approve.
                </p>
              </li>
              <li>
                <h3 className=" text-xl font-bold">
                  <CheckCircleOutlined />
                  Count on 24/7 support
                </h3>{" "}
                <p>
                  Our round-the-clock support team is available to help anytime,
                  anywhere.
                </p>
              </li>
            </ul>
          </div>
          <div className=" p-20">
            <div className=" mt-5 position-relative ">
              <div>
                <video controls width={700}>
                  <source src="./img/videoDemo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-20 container flex items-center justify-between">
        <div className="p-10">
          <video controls width={1100}>
            <source src="./img/demo2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div>
          <div className="flex items-center text-gray-400">
            <h3 className=" text-3xl font-semibold">Kay Kim, Co-Founder </h3>
            <span className="testimonial-logo ">
              <img
                alt="Company logo"
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/rooted-logo-x2.7da3bc9.png"
                loading="lazy"
              />
            </span>
          </div>

          <p className=" w-fit text-xl">
            "It's extremely exciting that Fiverr has freelancers from all over
            the world — it broadens the talent pool. One of the best things
            about Fiverr is that while we're sleeping, someone's working."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
