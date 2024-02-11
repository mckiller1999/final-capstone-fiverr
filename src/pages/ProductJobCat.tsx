import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  DsChiTietLoai,
  DsNhomChiTietLoai,
  JobCategoryModel,
} from "../models/JobDetail";

type Props = {
  prod: JobCategoryModel; // Chuyển kiểu của prod thành DsNhomChiTietLoai
};

const ProductJobCat = ({ prod }: Props) => {
  console.log(prod.dsNhomChiTietLoai[0]?.dsChiTietLoai);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={prod.dsNhomChiTietLoai[0]?.hinhAnh}
        title=" Title"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {prod.tenLoaiCongViec}{" "}
          {/* Sử dụng prod.tenNhom để hiển thị tên nhóm */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {/* Thêm mô tả hoặc nội dung tương tự từ dữ liệu */}
          <div className="px-6 pt-4 pb-2">
            {prod.dsNhomChiTietLoai[0]?.dsChiTietLoai.map((item) => (
              <span
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                key={item.id}
              >
                # {item.tenChiTiet}
              </span>
            ))}
          </div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default ProductJobCat;
