import React, { useEffect, useState } from "react";
import { Space, Table, Input } from "antd";
import type { TableProps } from "antd";
import axios from "axios";
import { ACCESS_TOKEN_CYBER } from "../../util/config";
import { NavLink } from "react-router-dom";

interface DataType {
  id: number;
  tenLoaiCongViec: string;
}
const { Search } = Input;

const columns: TableProps<DataType>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên Loại Công Việc",
    dataIndex: "tenLoaiCongViec",
    key: "tenLoaiCongViec",
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      //console.log(record.id);
      return (
        <Space size="middle">
          <NavLink to={`/admin/product-detail/${record.id}`}>
            Detail {record.tenLoaiCongViec}
          </NavLink>
        </Space>
      );
    },
  },
];
const ProductMangement: React.FC = () => {
  const [users, setUsers] = useState<DataType[]>([]); // Cập nhật kiểu dữ liệu cho users
  const [searchValue, setSearchValue] = useState<string>(""); // Thêm state mới để lưu trữ giá trị ô tìm kiếm

  const getUsersAPI = async () => {
    try {
      const token = ACCESS_TOKEN_CYBER;
      const res = await axios({
        headers: {
          tokenCybersoft: `${token}`,
        },
        url: "https://fiverrnew.cybersoft.edu.vn/api/loai-cong-viec",
        method: "GET",
      });
      setUsers(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersAPI();
  }, []);

  // Xử lý sự kiện tìm kiếm
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  // Lọc người dùng theo từ khóa tìm kiếm
  const filteredUsers = users.filter((user) =>
    user.tenLoaiCongViec.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={handleSearch} // Gọi hàm handleSearch khi người dùng nhấn nút tìm kiếm hoặc nhấn enter
      />
      <Table
        columns={columns}
        dataSource={filteredUsers.map((user) => ({ ...user, key: user.id }))}
      />
    </div>
  );
};

export default ProductMangement;
