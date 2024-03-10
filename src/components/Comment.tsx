import { Avatar, List, Rate } from 'antd';
import { IconButton, Typography } from '@mui/material';
import URL from '../constants/url';
import useAxios from '../hooks/useAxios';
import { useSelector } from 'react-redux';
import AddComment from './AddComment';
import { CommentRounded, Edit } from '@mui/icons-material';
import { USERLOGIN, getStorageJson } from '../util/config';
import { UserLogin } from '../redux/reducer/userReducer';
export interface CommentModel {
  id: string,
  tenNguoiBinhLuan: String,
  avatar: string,
  ngayBinhLuan: String,
  noiDung: String,
  saoBinhLuan: number
};

const Comment = () => {
  const jobDetail = useSelector((state: any) => state?.jobDetailReducer?.jobDetail);
  // const userLogin: UserLogin = getStorageJson(USERLOGIN);

  const { data } = useAxios({ url: URL.JOB_COMMENT(jobDetail[0].congViec.id), method: 'get' });

  const dataApi = data?.map((index: any) => ({
    name: index?.tenNguoiBinhLuan,
    date: index?.ngayBinhLuan,
    avatar: index?.avatar,
    rate: index?.saoBinhLuan,
    comment: index?.noiDung,
    id: index?.id,
  }));

  return (
    <div className='my-5 container mx-auto'>
      <hr />
      <div className='my-5'>
        <h1 className='text-xl text-gray-600 font-bold mb-3'>Comments <CommentRounded /></h1>
      </div>
      <div>
        <AddComment />
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
          dataSource={dataApi}
          renderItem={(item: any) => (
            <List.Item
              key={item?.id}
              actions={[
                <Typography variant="body1" color="text.secondary">
                  {item?.comment}
                </Typography>,
                <IconButton aria-label='edit' size='small' className='mr-0'>
                  <Edit fontSize='small' />
                </IconButton>
              ]}
              extra={
                <Rate disabled defaultValue={item?.rate} />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item?.avatar} size={50} />}
                title={<p className='font-semibold'>{item?.name}</p>}
                description={<p className='italic'>{item?.date}</p>}
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
