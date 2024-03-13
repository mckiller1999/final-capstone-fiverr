import React, { useEffect, useState } from "react";
import { Space, Table, Input, Button } from "antd";
import axios from "axios";
import {
  ACCESS_TOKEN_CYBER,
  getTokenFromLocalStorage,
} from "../../util/config";
import { NavLink } from "react-router-dom";

interface DataType {
  id: number;
  tenLoaiCongViec: string;
  ngayThue: string;
}

const { Search } = Input;

const BookingJob: React.FC = () => {
  const [jobs, setJobs] = useState<DataType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const getJobsAPI = async () => {
    try {
      const token = ACCESS_TOKEN_CYBER;
      const res = await axios({
        headers: {
          tokenCybersoft: `${token}`,
        },
        url: "https://fiverrnew.cybersoft.edu.vn/api/thue-cong-viec",
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

  const filteredJobs = jobs.filter((job) =>
    job.id.toString().toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleDelete = async (jobId: number) => {
    try {
      const tokenUser = getTokenFromLocalStorage();
      const token = ACCESS_TOKEN_CYBER;
      await axios({
        headers: {
          token: `${tokenUser}`,
          tokenCybersoft: `${token}`,
        },
        url: `https://fiverrnew.cybersoft.edu.vn/api/thue-cong-viec/${jobId}`,
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
      title: "Ngày thuê",
      dataIndex: "ngayThue",
      key: "ngayThue",
    },
    {
      title: "Action",
      key: "action",
      render: (
        _: any,
        record: DataType // Thêm kiểu dữ liệu cho record
      ) => (
        <Space size="middle">
          <NavLink to={`/admin/booking-detail/${record.id}`}>
            Chi tiết {record.id}
          </NavLink>
          <Button onClick={() => handleDelete(record.id)} danger>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Search
        placeholder="Nhập từ khóa tìm kiếm"
        allowClear
        enterButton="Tìm kiếm"
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

export default BookingJob;
