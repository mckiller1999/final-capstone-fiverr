// useAxios hook

import { useState, useEffect } from "react";
import axios from "axios";
import { ACCESS_TOKEN_CYBER } from "../util/config";
import { BASE_URL } from "../constants/config";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setLoading } from "../redux/reducer/loadingReducer";

type TUseAxios = {
  url: string;
  method: "get" | "put" | "post" | "delete";
  body?: any;
};

const useAxios = ({ url, method, body }: TUseAxios) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);
  const dispatch: AppDispatch = useDispatch();

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const fetchData = async () => {
    dispatch(setLoading(true));

    await axios[method](
      url,
      {
        headers: {
          tokenCybersoft: ACCESS_TOKEN_CYBER,
        },
        baseURL: BASE_URL,
      },
      body
    )
      .then(async (res) => {
        await sleep(1000);
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, url, body]);

  return { data: response?.content, error, loading };
};

export default useAxios;
