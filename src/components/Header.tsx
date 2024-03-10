import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../redux/store";
import { openLoginForm } from "../redux/reducer/loginFormReducer";
import SearchTool from "./SearchTool";
import CatogeryTab from "./CatogeryTab";

const Header = () => {
  const [isTop, setIsTop] = useState(true);
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const [hideCategoryTab, setHideCategoryTab] = useState(false);

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
      style={{
        backgroundColor: isTop ? "transparent" : "#fff",
        position: "fixed",
        zIndex: 110,
        width: "100vw",
        top: 0,
        transition: "0.5s",
      }}
    >
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
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div>{!hideCategoryTab && <SearchTool />}</div>
        <div className="block lg:flex lg:items-center justify-between w-auto">
          <div className="">{renderLogin()}</div>
        </div>
      </nav>

      {!hideCategoryTab && <CatogeryTab />}
    </div>
  );
};

export default Header;
