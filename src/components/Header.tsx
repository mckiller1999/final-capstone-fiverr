import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useFormik } from "formik";

type Props = {};

const Header = (props: Props) => {
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
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
      >
        Login
      </NavLink>
    );
  };
  const navigate = useNavigate();
  const frm = useFormik({
    initialValues: {
      keyword: ''
    },
    onSubmit: ({ keyword }) => {
      // history.push(`/search?keyword=${keyword}`)
      navigate(`/search?keyword=${keyword}`)
    }
  });

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
            <form onSubmit={frm.handleSubmit}>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="keyword"
                  onChange={frm.handleChange}
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
