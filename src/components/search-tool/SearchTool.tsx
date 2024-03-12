import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import "./SearchTool.scss";
const SearchTool = () => {
  const navigate = useNavigate();
  const frm = useFormik({
    initialValues: {
      keyword: "",
    },
    onSubmit: ({ keyword }) => {
      // history.push(`/search?keyword=${keyword}`)
      navigate(`/search?keyword=${keyword}`);
    },
  });

  return (
    <form onSubmit={frm.handleSubmit} className="main">
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
          className="block p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:w-5/12 md:w-4/12 lg:w-3/12 xl:w-2/12"
          placeholder="Search..."
          required
        />
      </div>
    </form>
  );
};

export default SearchTool;