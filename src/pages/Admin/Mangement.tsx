import React, { useEffect, useState } from "react";
import { Space, Table, Input } from "antd";
import type { TableProps } from "antd";
import axios from "axios";
import { ACCESS_TOKEN_CYBER } from "../../util/config";
import { NavLink } from "react-router-dom";
interface DataType {
  id: string;
  tenCongViec: string;
  giaTien: string;
  danhGia: string;
  saoCongViec: string;
}
const { Search } = Input;
const columns: TableProps<DataType>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Job",
    dataIndex: "tenCongViec",
    key: "tenCongViec",
  },
  {
    title: "Price",
    dataIndex: "giaTien",
    key: "giaTien",
  },
  {
    title: "Đánh Giá",
    dataIndex: "danhGia",
    key: "danhGia",
  },
  {
    title: "Vote",
    key: "saoCongViec",
    dataIndex: "saoCongViec",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      return (
        <Space size="middle">
          <NavLink to={`/admin/job-detail/${record.id}`}>Detail</NavLink>
        </Space>
      );
    },
  },
];

const Mangement: React.FC = () => {
  const [jobs, setJobs] = useState<DataType[]>([]); // Cập nhật kiểu dữ liệu cho users
  const [searchValue, setSearchValue] = useState<string>("");
  const getJobsAPI = async () => {
    try {
      const token = ACCESS_TOKEN_CYBER;
      const res = await axios({
        headers: {
          tokenCybersoft: `${token}`,
        },
        url: "https://fiverrnew.cybersoft.edu.vn/api/cong-viec",
        method: "GET",
      });
      setJobs(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getJobsAPI();
    console.log(jobs);
  }, []);
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  // Lọc người dùng theo từ khóa tìm kiếm
  const filteredUsers = jobs.filter((job) =>
    job.tenCongViec.toLowerCase().includes(searchValue.toLowerCase())
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
        dataSource={filteredUsers.map((job) => ({ ...job, key: job.id }))}
      />
    </div>
  );
};

export default Mangement;
