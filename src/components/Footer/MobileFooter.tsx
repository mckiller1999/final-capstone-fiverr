import { ChevronLeft } from "@mui/icons-material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type TMobileFooter = {
  data: any;
};
const MobileFooter = ({ data }: TMobileFooter) => {
  const [clicked, setClicked] = useState(false);
  const toggle = (index: any) => {
    if (clicked === index) {
      return setClicked(true);
    }
    setClicked(index);
  };

  return (
    <div className="w-full flex sm:hidden items-start justify-start flex-col pt-5">
      {data.map((item: any, i: any) => (
        <div key={i} className="w-full rounded-lg py-2 flex flex-col gap-2">
          <div
            onClick={() => toggle(i)}
            className="flex items-center justify-between cursor-pointer text-gray-600"
          >
            <h2 className="text-base font-semibold">{item.title}</h2>
            <span
              className={`${
                clicked === i ? "rotate-[-90deg]" : "rotate-[0deg]"
              } transition-all duration-300`}
            >
              <ChevronLeft />
            </span>
          </div>
          <div
            className={`flex items-start justify-start flex-col gap-4 transition-all duration-500 ${
              clicked === i ? "flex" : "hidden"
            }`}
          >
            {item.links.map((item: any, i: any) => (
              <Link
                to={item.to}
                key={i}
                className="text-gray-500 hover:underline transition-all duration-300 hover:text-darkColor"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileFooter;
