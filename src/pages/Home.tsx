import { useEffect, useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN_CYBER } from "../util/config";
import { JobCategoryModel } from "../models/JobDetail";
import ProductJobCat from "./ProductJobCat";
import Slider from "react-slick";
import type { SearchProps } from "antd/es/input/Search";
import { Carousel, Input } from "antd";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { CheckCircleOutlined } from "@mui/icons-material";
import { useWindowSize } from "../hooks/useWindowSize";
type Props = {};
const { Search } = Input;

const Home = (props: Props) => {
  const size = useWindowSize();

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

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    frm.handleSubmit();
  };

  const [arrProductJob, setArrProductJob] = useState<JobCategoryModel[]>([]);
  //console.log(arrProduct);
  let settings1 = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: true,
  };
  let settings2 = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
  };
  let settings3 = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  let settings = settings1;
  if (size.width < 500) {
    settings = settings3;
  } else if (size.width < 992) {
    settings = settings2;
  }
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
    getAllProdCateApi();
  }, []);

  const handleCardClick = (key: string) => {
    // setCurrent(key);
    console.log(key);
    navigate(`/job/${key}`);
  };

  return (
    <div className=" flex justify-center items-center flex-col">
      <div className="container" style={{ maxWidth: "99vw" }}>
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
            Find the right <span className="fraunces500">freelance</span>
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
                  left: 900,
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
                style={{ position: "fixed", bottom: 0, left: 900 }}
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
                  left: 900,
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
                  left: 900,
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

      <div className="max-w-full my-44 container">
        <div className="container my-4">
          <h3 className=" font-bold text-4xl">Popular professional services</h3>
          <div className="container" style={{ maxWidth: "100vw" }}>
            <Slider {...settings}>
              {arrProductJob?.map((prod: JobCategoryModel) => (
                <div className="ml-12" key={prod.id}>
                  <ProductJobCat prod={prod} onCardClick={handleCardClick} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <div
        className="container  bg-blue-50 flex justify-center items-center "
        style={{ height: 900, maxWidth: "100vw" }}
      >
        <div className="container">
          <div className="sm:flex sm:flex-col items-center justify-between md:flex md:flex-row items-center justify-between">
            <div className="flex flex-col w-80">
              <h1 className=" my-10 sm:text-3xl font-bold lg:text-3xl font-bold">
                The best part? Everything.
              </h1>
              <ul className="space-y-3">
                <li>
                  <h3 className="sm:text-xs lg:text-xl font-bold">
                    <CheckCircleOutlined />
                    Stick to your budget
                  </h3>
                  <p className="sm:text-xs lg:text-base">
                    Find the right service for every price point. No hourly
                    rates, just project-based pricing.
                  </p>
                </li>
                <li>
                  <h3 className="sm:text-xs lg:text-xl font-bold">
                    <CheckCircleOutlined />
                    Get quality work done quickly{" "}
                  </h3>
                  <p className="sm:text-xs lg:text-base">
                    Find the right service for every price point. No hourly
                    rates, just project-based pricing.
                  </p>
                </li>
                <li>
                  <h3 className="sm:text-xs lg:text-xl font-bold">
                    <CheckCircleOutlined />
                    Pay when you're happy
                  </h3>
                  <p className="sm:text-xs lg:text-base">
                    Upfront quotes mean no surprises. Payments only get released
                    when you approve.
                  </p>
                </li>
                <li>
                  <h3 className="sm:text-xs lg:text-xl font-bold">
                    <CheckCircleOutlined />
                    Count on 24/7 support
                  </h3>{" "}
                  <p className="sm:text-xs lg:text-base">
                    Our round-the-clock support team is available to help
                    anytime, anywhere.
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
      </div>
      <div className="container">
        <Carousel effect="fade" className="container">
          <div className="container">
            <div className="sm:flex sm:flex-col items-center justify-between md:flex md:flex-row items-center justify-between">
              <div className="p-10">
                <video controls width={1100}>
                  <source src="./img/demo2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div>
                <div className="container flex items-center text-gray-400">
                  <h3 className=" text-3xl font-semibold">
                    Kay Kim, Co-Founder{" "}
                  </h3>
                  <span className="testimonial-logo ">
                    <img
                      alt="Company logo"
                      src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/rooted-logo-x2.7da3bc9.png"
                      loading="lazy"
                    />
                  </span>
                </div>

                <p className=" w-fit text-xl">
                  "It's extremely exciting that Fiverr has freelancers from all
                  over the world — it broadens the talent pool. One of the best
                  things about Fiverr is that while we're sleeping, someone's
                  working."
                </p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="sm:flex sm:flex-col items-center justify-between md:flex md:flex-row items-center justify-between">
              <div className="p-10">
                <video controls width={1100}>
                  <source src="./img/demo4.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div>
                <div className="container flex items-center text-gray-400">
                  <h3 className=" text-3xl font-semibold">
                    Brighid Gannon (DNP, PMHNP-BC), Co-Founder{" "}
                  </h3>
                  <span className="testimonial-logo ">
                    <img
                      alt="Company logo"
                      src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/lavender-logo-x2.3fff9e7.png"
                      loading="lazy"
                    />
                  </span>
                </div>

                <p className=" w-fit text-xl">
                  "We used Fiverr for SEO, our logo, website, copy, animated
                  videos — literally everything. It was like working with a
                  human right next to you versus being across the world."
                </p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="sm:flex sm:flex-col items-center justify-between md:flex md:flex-row items-center justify-between">
              <div className="p-10">
                <video controls width={1100}>
                  <source src="./img/demo3.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div>
                <div className="container flex items-center text-gray-400">
                  <h3 className=" text-3xl font-semibold">
                    Caitlin Tormey, Chief Commercial Officer
                  </h3>
                  <span className="testimonial-logo ">
                    <img
                      alt="Company logo"
                      src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/naadam-logo-x2.a79031d.png"
                      loading="lazy"
                    />
                  </span>
                </div>

                <p className=" w-fit text-xl">
                  "We've used Fiverr for Shopify web development, graphic
                  design, and backend web development. Working with Fiverr makes
                  my job a little easier every day."
                </p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="sm:flex sm:flex-col items-center justify-between md:flex md:flex-row items-center justify-between">
              <div className="p-10">
                <video controls width={1100}>
                  <source src="./img/demo5.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div>
                <div className="container flex items-center text-gray-400">
                  <h3 className=" text-3xl font-semibold">
                    Tim and Dan Joo, Co-Founders{" "}
                  </h3>
                  <span className="testimonial-logo ">
                    <img
                      alt="Company logo"
                      src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/haerfest-logo-x2.934ab63.png"
                      loading="lazy"
                    />
                  </span>
                </div>

                <p className=" w-fit text-xl">
                  "When you want to create a business bigger than yourself, you
                  need a lot of help. That's what Fiverr does."
                </p>
              </div>
            </div>
          </div>
        </Carousel>
        <div className="my-32  ">
          <h3 className="my-20 font-bold text-4xl">
            You need it, we've got it
          </h3>
          <div className="container flex justify-center">
            <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-40">
              <NavLink
                to="/job/1"
                className="flex flex-col items-center justify-center"
              >
                <img
                  width={50}
                  height={50}
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.91dfe44.svg"
                  alt=""
                />
                <p>Graphics & Design</p>
              </NavLink>

              <NavLink
                to="/job/2"
                className="flex flex-col items-center justify-center"
              >
                <img
                  width={50}
                  height={50}
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/online-marketing.a3e9794.svg"
                  alt=""
                />
                <p>Digital Marketing</p>
              </NavLink>

              <NavLink
                to="/job/3"
                className="flex flex-col items-center justify-center"
              >
                <img
                  width={50}
                  height={50}
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/writing-translation.a787f2f.svg"
                  alt=""
                />
                <p>Writing & Translation</p>
              </NavLink>

              <NavLink
                to="/job/4"
                className="flex flex-col items-center justify-center"
              >
                <img
                  width={50}
                  height={50}
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/video-animation.1356999.svg"
                  alt=""
                />
                <p>Video & Animation</p>
              </NavLink>

              <NavLink
                to="/job/5"
                className="flex flex-col items-center justify-center"
              >
                <img
                  width={50}
                  height={50}
                  src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/music-audio.ede4c90.svg"
                  alt=""
                />
                <p>Music & Audio</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
