import React from "react";
import { Card } from "antd";
import { JobCategoryModel } from "../models/JobDetail";

type Props = {
  prod: JobCategoryModel;
  onCardClick: (key: any) => void; // Truyền hàm xử lý click từ Home xuống
};

const { Meta } = Card;

const ProductJobCat = ({ prod, onCardClick }: Props) => {
  console.log(prod);
  const handleCardClick = () => {
    onCardClick(prod.dsNhomChiTietLoai[0]?.maLoaiCongviec); // Truyền key của ProductJobCat lên Home khi card được click
  };

  return (
    <div style={{ minHeight: "20vh" }}>
      <Card
        hoverable
        style={{ width: 240, height: 340, margin: 20 }}
        cover={
          <img
            alt="example"
            style={{ height: 340, width: "100%" }}
            src={prod.dsNhomChiTietLoai[0]?.hinhAnh}
          />
        }
        onClick={handleCardClick} // Gắn hàm xử lý click vào sự kiện click của card
      >
        <Meta title={prod.tenLoaiCongViec} />
      </Card>
    </div>
  );
};

export default ProductJobCat;
