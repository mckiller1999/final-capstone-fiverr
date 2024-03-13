import React, { useEffect, useState } from "react";
import { Space, Table, Input, Button } from "antd";
import axios from "axios";
import {
  ACCESS_TOKEN_CYBER,
  getTokenFromLocalStorage,
} from "../../util/config";
import { NavLink } from "react-router-dom";

interface DataType {
  id: string;
  tenCongViec: string;
  giaTien: string;
  danhGia: string;
  saoCongViec: string;
}

const { Search } = Input;

const Mangement: React.FC = () => {
  const [jobs, setJobs] = useState<DataType[]>([]);
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
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleDelete = async (jobId: string) => {
    try {
      const token = ACCESS_TOKEN_CYBER;
      const tokenUser = getTokenFromLocalStorage();
      await axios({
        headers: {
          tokenCybersoft: `${token}`,
          token: `${tokenUser}`,
        },
        url: `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/${jobId}`,
        method: "DELETE",
      });
      // Xóa công việc khỏi danh sách sau khi xóa thành công
      setJobs(jobs.filter((job) => job.id !== jobId));
      alert("Xóa thành công");
    } catch (error) {
      console.error(error);
      alert("Đã có lỗi xảy ra khi xóa");
    }
  };

  const columns = [
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
      title: "Action",
      key: "action",
      render: (
        _: any,
        record: DataType // Thêm kiểu dữ liệu cho đối số _
      ) => (
        <Space size="middle">
          <NavLink to={`/admin/job-detail/${record.id}`}>Detail</NavLink>
          <Button onClick={() => handleDelete(record.id)} danger>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const filteredJobs = jobs.filter((job) =>
    job.tenCongViec.toLowerCase().includes(searchValue.toLowerCase())
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
        dataSource={filteredJobs.map((job) => ({ ...job, key: job.id }))}
      />
    </div>
  );
};

export default Mangement;
