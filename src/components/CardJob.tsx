import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { JobModelByName } from "../pages/Search";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN_CYBER, saveStorageJson } from "../util/config";
import axios from "axios";

import { JobModel } from "../models/Jobs";
import { CardActionArea } from "@mui/material";
import { Rate } from "antd";

type Props = {
  prod?: JobModelByName;
  data?: JobModel;
};

const CardJob = ({ prod, data }: Props) => {
  const [favorite, setFavorite] = useState(false);
  const handleClickFavorite = () => {
    console.log(prod);
    setFavorite(!favorite);
  };

  const [productDetail, setProductDetail] = useState<JobModelByName[]>([]);

  const getProductDetailApi = async () => {
    try {
      const token = ACCESS_TOKEN_CYBER;
      const res = await axios({
        headers: {
          tokenCybersoft: ` ${token}`,
        },
        url: `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-cong-viec-chi-tiet/${prod?.id}`,
      });
      setProductDetail(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductDetailApi();
  }, []);

  const navigate = useNavigate();
  const handleClickCard = () => {
    saveStorageJson("dataJobDetail", productDetail);
    navigate(`/detail/${prod?.id}`);
  };

  return (
    <Card sx={{ width: 300, height: 500 }}>
      <CardActionArea onClick={handleClickCard}>
        <div className="p-5">
          <CardMedia
            component="img"
            height="194"
            image={prod?.congViec.hinhAnh}
            alt={prod?.congViec.hinhAnh}
          />
        </div>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={prod?.avatar}
            ></Avatar>
          }
          title={prod?.tenNguoiTao}
          subheader="Level ???"
        />
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            {prod?.congViec.tenCongViec}
          </Typography>
          <div className="mt-3 flex">
            <Rate
              disabled
              value={prod?.congViec.saoCongViec}
              className="text-sm sm:text-lg my-0 py-0"
            />
            <div>
              <span className="ml-2 text-gray-600 text-sm algin-middle hidden xl:inline-block">
                ({prod?.congViec.danhGia})
              </span>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
      <hr />
      <CardActions disableSpacing className="flex justify-between">
        <IconButton
          aria-label="add to favorites"
          onClick={handleClickFavorite}
          className="z-50"
        >
          <FavoriteIcon className={favorite ? "text-red-600" : ""} />
        </IconButton>
        <Typography variant="subtitle2" color="text.secondary">
          Starting at
          <span className="text-black text-lg ">
            {" "}
            ${prod?.congViec.giaTien}
          </span>
        </Typography>
      </CardActions>
    </Card>
  );
};

export default CardJob;
