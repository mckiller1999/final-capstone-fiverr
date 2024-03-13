import React, { useEffect, useState } from "react";
import { Space, Table, Input, Button } from "antd";
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

const { Search } = Input;

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<DataType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

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

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleDelete = async (userId: string) => {
    try {
      const token = ACCESS_TOKEN_CYBER;
      await axios({
        headers: {
          tokenCybersoft: `${token}`,
        },
        url: `https://fiverrnew.cybersoft.edu.vn/api/users?id=${userId}`,
        method: "DELETE",
      });
      // Xóa người dùng khỏi danh sách sau khi xóa thành công
      setUsers(users.filter((user) => user.id !== userId));
      alert("Xóa người dùng thành công");
    } catch (error) {
      console.error(error);
      alert("Đã có lỗi xảy ra khi xóa người dùng");
    }
  };

  const columns = [
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
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <NavLink to={`/admin/user-detail/${record.id}`}>
            Detail {record.name}
          </NavLink>
          <Button onClick={() => handleDelete(record.id)} danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchValue.toLowerCase())
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

export default UserManagement;
