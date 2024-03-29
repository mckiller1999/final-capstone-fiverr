import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";
import { openLoginForm } from "../redux/reducer/loginFormReducer";
import SearchTool from "./search-tool/SearchTool";
import CatogeryTab from "./CatogeryTab";

const Header = () => {
  const [isTop, setIsTop] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768); // Kiểm tra kích thước màn hình
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const [hideCategoryTab, setHideCategoryTab] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // State để theo dõi hiển thị phần đăng nhập
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

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 768); // Cập nhật trạng thái màn hình nhỏ
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize); // Thêm sự kiện resize
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize); // Xóa sự kiện resize khi unmount
    };
  }, []);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const renderLogin = () => {
    if (userLogin?.user) {
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
      } `}
      style={{
        backgroundColor: isTop ? "transparent" : "#fff",
        width: "100%",
        top: 0,
        zIndex: 100,
      }}
    >
      <div className="mx-auto ">
        <nav className="container flex items-center justify-evenly sm:justify-between flex-wrap p-6">
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
            {/* Hiển thị phần đăng nhập khi màn hình không nhỏ */}
            {!isSmallScreen && renderLogin()}
            {/* Button để hiển thị hoặc ẩn phần đăng nhập */}
            {isSmallScreen && (
              <button
                onClick={toggleLogin}
                className="lg:hidden block mt-4 lg:inline-block text-base font-extrabold lg:mt-0 text-blue-gray-300 hover:text-blue-gray-100 mr-4"
              >
                {showLogin ? "x" : "="}
              </button>
            )}
          </div>
          {isSmallScreen && showLogin && (
            <div className="lg:hidden">{renderLogin()}</div>
          )}

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
        {/* Phần đăng nhập */}
      </div>
    </div>
  );
};

export default Header;
