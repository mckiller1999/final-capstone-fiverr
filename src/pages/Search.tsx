import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ACCESS_TOKEN_CYBER } from "../util/config";
import CardJob from "../components/CardJob";
import { JobModel } from "../models/Jobs";
export interface JobModelByName {
  avatar: string;
  id: number;
  tenChiTietLoai: string;
  tenLoaiCongViec: string;
  tenNguoiTao: string;
  tenNhomChiTietLoai: string;
  congViec: JobModel;
}

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [arrProduct, setArrProduct] = useState<JobModelByName[]>([]);
  const keywords: any = searchParams.get("keyword");
  const formSearch = useFormik<{ keyword: string }>({
    initialValues: {
      keyword: keywords,
    },

    onSubmit: (Values) => {
      setSearchParams({
        keyword: Values.keyword,
      });
    },
  });

  const getProductByKeyword = async () => {
    const token = ACCESS_TOKEN_CYBER;
    const res = await axios({
      headers: {
        tokenCybersoft: ` ${token}`,
      },
      url: `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-danh-sach-cong-viec-theo-ten/${keywords}`,
      method: "GET",
    });
    setArrProduct(res.data.content);
  };
  useEffect(() => {
    getProductByKeyword();
  }, [keywords]);

  return (
    <div className="mt-5 mx-auto max-w-7xl">
      <form
        className="container mx-auto w-3/4 lg:w-1/2 "
        onSubmit={formSearch.handleSubmit}
      >
        <label
          htmlFor="keyword"
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
            id="keyword"
            name="keyword"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="keyword"
            onChange={formSearch.handleChange}
            value={formSearch.values.keyword}
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
      <div>
        <h3 className="mt-5 ml-5 text-xl font-bold">
          {" "}
          - Results for '{keywords}' -{" "}
        </h3>
      </div>
      <div className="container mx-auto my-3">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3">
          {arrProduct?.map((prod: JobModelByName) => (
            <div className="m-5" key={prod.id}>
              <CardJob prod={prod} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
