import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../redux/store";
import { openLoginForm } from "../redux/reducer/loginFormReducer";
import SearchTool from "./SearchTool";
import CatogeryTab from "./CatogeryTab";

type Props = {};

const Header = (props: Props) => {
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();

  console.log(userLogin);
  const renderLogin = () => {
    if (userLogin?.user) {
      return (
        <NavLink
          to="/profile"
          className="block mt-4 lg:inline-block lg:mt-0 text-blue-gray-300 hover:text-white mr-4"
        >
          {userLogin?.user.name}
        </NavLink>
      );
    }
    return (
      <NavLink
        to="/login"
        className="block mt-4 lg:inline-block lg:mt-0 text-blue-gray-300 hover:text-white mr-4"
        onClick={() => {
          dispatch(openLoginForm());
        }}
      >
        Login
      </NavLink>
    );
  };

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
        <div className="flex items-center flex-shrink-0  mr-6">
          <NavLink
            to={"/"}
            className="font-semibold text-xl tracking-tight text-blue-gray-200"
          >
            NavBar
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
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <NavLink
              to="/"
              className="block mt-4 lg:inline-block lg:mt-0 text-blue-gray-300 hover:text-white mr-4"
            >
              main
            </NavLink>
            {renderLogin()}

            <NavLink
              to="/job"
              className="block mt-4 lg:inline-block lg:mt-0 text-blue-gray-300 hover:text-white mr-4"
            >
              Job
            </NavLink>
          </div>
          <div>
            <SearchTool />
          </div>
        </div>
      </nav>
      <CatogeryTab />
    </div>
  );
};

export default Header;
