import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";
import { openLoginForm } from "../redux/reducer/loginFormReducer";
import SearchTool from "./search-tool/SearchTool";
import CatogeryTab from "./CatogeryTab";
import * as jwt from "jwt-decode";

const Header = () => {
  const [isTop, setIsTop] = useState(true);
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const [hideCategoryTab, setHideCategoryTab] = useState(false);
  const { pathname } = useLocation();

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsTop(scrollTop === 0);
    if (scrollTop === 0) {
      setHideCategoryTab(true);
    } else {
      setHideCategoryTab(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //console.log(userLogin?.user.role);

  const renderLogin = () => {
    if (userLogin?.user) {
      // Kiểm tra xem userLogin?.user.role có tồn tại không trước khi so sánh với "ADMIN"
      if (userLogin?.user.role && userLogin.user.role === "ADMIN") {
        return (
          <div>
            <NavLink
              to="/profile"
              className="block mt-4 lg:inline-block text-base font-extrabold lg:mt-0 text-blue-gray-300 hover:text-blue-gray-100 mr-4"
            >
              {userLogin?.user.name}
            </NavLink>
            <NavLink
              to="/create-job"
              className="block mt-4 lg:inline-block text-base font-extrabold lg:mt-0 text-blue-gray-300 hover:text-blue-gray-100 mr-4"
            >
              CREATE A <span className="fraunces500">Job</span>
            </NavLink>
          </div>
        );
      } else {
        return (
          <div>
            <NavLink
              to="/profile"
              className="block mt-4 lg:inline-block text-base font-extrabold lg:mt-0 text-blue-gray-300 hover:text-blue-gray-100 mr-4"
            >
              {userLogin?.user.name}
            </NavLink>
            {/* Hiển thị NavLink nhưng không có "CREATE A Job" */}
          </div>
        );
      }
    }
    return (
      <NavLink
        to="/login"
        className="block mt-4 lg:inline-block text-base font-extrabold lg:mt-0 text-blue-gray-300 hover:text-blue-gray-100 mr-4"
        onClick={() => {
          dispatch(openLoginForm());
        }}
      >
        Login
      </NavLink>
    );
  };

  return (
    <div
      className={`${
        pathname !== "/" ? "bg-white sticky" : "fixed duration-500"
      }`}
      style={{
        backgroundColor: isTop ? "transparent" : "#fff",

        width: "100vw",

        top: 0,
        zIndex: 100,
      }}
    >
      <div className="mx-auto ">
        <nav className="container flex items-center justify-between flex-wrap p-6">
          <div className="flex items-center flex-shrink-0  mr-6">
            <NavLink
              to={"/"}
              className="font-semibold text-xl tracking-tight text-blue-gray-200 m-5"
            >
              <img
                src="/img/fiverr-2.svg"
                alt="Fiverr Logo"
                width={100}
                height={80}
              />
            </NavLink>
          </div>
          <div className="block lg:flex lg:items-center justify-evenly w-auto">
            <div className="">{renderLogin()}</div>
          </div>
          <div
            className={`${
              !hideCategoryTab || pathname !== "/" ? "" : "hidden"
            } scroll-smooth`}
          >
            <SearchTool />
          </div>
        </nav>
        <div
          className={`${
            !hideCategoryTab || pathname !== "/" ? "" : "hidden"
          } scroll-smooth`}
        >
          <CatogeryTab />
        </div>
      </div>
    </div>
  );
};

export default Header;
