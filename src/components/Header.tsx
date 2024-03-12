import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";
import { openLoginForm } from "../redux/reducer/loginFormReducer";
import SearchTool from "./SearchTool";
import CatogeryTab from "./CatogeryTab";

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

  const renderLogin = () => {
    if (userLogin?.user) {
      return (
        <NavLink
          to="/profile"
          className="block mt-4 lg:inline-block text-2xl font-extrabold lg:mt-0 text-blue-gray-300 hover:text-blue-gray-100 mr-4"
        >
          {userLogin?.user.name}
        </NavLink>
      );
    }
    return (
      <NavLink
        to="/login"
        className="block mt-4 lg:inline-block text-2xl font-extrabold lg:mt-0 text-blue-gray-300 hover:text-blue-gray-100 mr-4"
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
      className={`${pathname !== "/" ? "bg-white sticky" : "fixed duration-500"}`}
      style={{
        backgroundColor: isTop ? "transparent" : "#fff",
        width: "100vw",
        top: 0,
        zIndex: 100
      }}
    >
      <div className="max-w-7xl mx-auto">
        <nav className="container flex items-center justify-between flex-wrap p-6">
          <div className="flex items-center flex-shrink-0  mr-6">
            <NavLink
              to={"/"}
              className="font-semibold text-xl tracking-tight text-blue-gray-200"
            >
              <img
                src="/img/fiverr-2.svg"
                alt="Fiverr Logo"
                width={100}
                height={80}
              />
            </NavLink>
          </div>
          {/* <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div> */}
          <div className={`${pathname !== "/" ? "" : "hidden"} scroll-smooth w-1/2`}>
            <SearchTool />      </div>
          <div className="block lg:flex lg:items-center justify-between w-auto">
            <div className="">{renderLogin()}</div>
          </div>
        </nav>
        <div className={`${!hideCategoryTab || pathname !== "/" ? "" : "hidden"} scroll-smooth`}>
          <CatogeryTab />
        </div>
      </div>
    </div>
  );
};

export default Header;
