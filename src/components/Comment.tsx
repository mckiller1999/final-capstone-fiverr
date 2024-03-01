import { useEffect, useState } from 'react';
import { ACCESS_TOKEN_CYBER } from '../util/config';
import axios from 'axios';
import { JobModelByName } from '../pages/Search';
import { JobModel } from '../models/Jobs';
import { Avatar, List, Rate } from 'antd';
import { Typography } from '@mui/material';
export interface CommentModel {
  id: string,
  tenNguoiBinhLuan: String,
  avatar: string,
  ngayBinhLuan: String,
  noiDung: String,
  saoBinhLuan: number
};

type Props = {
  prod: JobModelByName[]
};

const Comment = ({ prod }: Props) => {
  const jobDetail: JobModel = prod[0].congViec;
  const [commentData, setCommentData] = useState<CommentModel[]>([]);
  const getProductDetailApi = async () => {
    try {
      const token = ACCESS_TOKEN_CYBER;
      const res = await axios({
        headers: {
          tokenCybersoft: ` ${token}`,
        },
        url: `https://fiverrnew.cybersoft.edu.vn/api/binh-luan/lay-binh-luan-theo-cong-viec/${jobDetail.id}`,
      });
      setCommentData(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetailApi();
  }, []);

  const data = commentData.map((index) => ({
    name: index.tenNguoiBinhLuan,
    date: index.ngayBinhLuan,
    avatar: index.avatar,
    rate: index.saoBinhLuan,
    comment: index.noiDung,
    id: index.id,
  }));

  return (
    <div className='my-5 container mx-auto'>
      <hr />
      <div className='mt-3'>
        <h1 className='text-xl text-gray-600 font-bold mb-3'>Comments</h1>
      </div>
      <div className='w-3/4 mx-auto my-5'>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <Typography variant="body1" color="text.secondary">
                  {item.comment}
                </Typography>
              ]}
              extra={
                <Rate disabled defaultValue={item.rate} />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} size={50} />}
                title={<p className='font-semibold'>{item.name}</p>}
                description={<p className='italic'>{item.date}</p>}
              />
              {/* <Rate disabled defaultValue={item.rate} /> */}
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default Comment
