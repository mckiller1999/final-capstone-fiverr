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
    title: "Ngày thuê",
    dataIndex: "ngayThue",
    key: "ngayThue",
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      //console.log(record.id);
      return (
        <Space size="middle">
          <NavLink to={`/admin/booking-detail/${record.id}`}>
            Detail {record.id}
          </NavLink>
        </Space>
      );
    },
  },
];
const BookingJob: React.FC = () => {
  const [users, setUsers] = useState<DataType[]>([]); // Cập nhật kiểu dữ liệu cho users
  const [searchValue, setSearchValue] = useState<string>(""); // Thêm state mới để lưu trữ giá trị ô tìm kiếm

  const getUsersAPI = async () => {
    try {
      const token = ACCESS_TOKEN_CYBER;
      const res = await axios({
        headers: {
          tokenCybersoft: `${token}`,
        },
        url: "https://fiverrnew.cybersoft.edu.vn/api/thue-cong-viec",
        method: "GET",
      });
      setUsers(res.data.content);
      console.log(users);
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
    user.id.toString().toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
      />
      <Table
        columns={columns}
        dataSource={filteredUsers.map((user) => ({ ...user, key: user.id }))}
      />
    </div>
  );
};

export default BookingJob;
