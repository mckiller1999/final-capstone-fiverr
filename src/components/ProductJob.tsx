import React from "react";
import { NavLink } from "react-router-dom";
import { JobModel } from "../models/Jobs";

type Props = {
  prod?: JobModel;
};

const ProductJob = ({ prod }: Props) => {
  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src={prod?.hinhAnh}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text- mb-2">{prod?.tenCongViec}</div>
          <p className="text-gray-700 text-base">{prod?.giaTien}$</p>
          <p className="text-gray-700 text-base">{prod?.moTaNgan}</p>
        </div>

        <div className="px-6 pt-4 pb-2 m-3">
          <NavLink
            to={`/detail/${prod?.id}`}
            className={
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            }
          >
            view detail
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ProductJob;
