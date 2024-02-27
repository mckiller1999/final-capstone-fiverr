import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import type { TableProps } from "antd";
import axios from "axios";
import { ACCESS_TOKEN_CYBER } from "../../util/config";
import { NavLink } from "react-router-dom";

interface DataType {
  id: string;
  name: string;
  role: string;
  email: string;
  date: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Date",
    key: "birthday",
    dataIndex: "birthday",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      //console.log(record.id); // Xác minh rằng record.id là giá trị bạn mong muốn.
      return (
        <Space size="middle">
          <NavLink to={`/admin/user-detail/${record.id}`}>
            Detail {record.name}
          </NavLink>
        </Space>
      );
    },
  },
];

const UserMangement: React.FC = () => {
  const [users, setUsers] = useState<DataType[]>([]); // Cập nhật kiểu dữ liệu cho users

  const getUsersAPI = async () => {
    try {
      const token = ACCESS_TOKEN_CYBER;
      const res = await axios({
        headers: {
          tokenCybersoft: `${token}`,
        },
        url: "https://fiverrnew.cybersoft.edu.vn/api/users",
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

  return (
    <Table
      columns={columns}
      dataSource={users.map((user) => ({ ...user, key: user.id }))} // Thêm key cho mỗi user
    />
  );
};

export default UserMangement;
