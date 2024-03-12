import { Avatar, List, Rate } from 'antd';
import { Typography } from '@mui/material';
import URL from '../constants/url';
import useAxios from '../hooks/useAxios';
import { useSelector } from 'react-redux';
import AddComment from './AddComment';
import { CommentRounded } from '@mui/icons-material';
import { ACCESS_TOKEN, USERLOGIN, getStorageJson } from '../util/config';
import { UserLogin } from '../redux/reducer/userReducer';
import { useEffect } from 'react';
import ButtonEditPopover from './EditComment';
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
  const userLogin: UserLogin = getStorageJson(USERLOGIN);
  const allComment = useAxios({ url: URL.ALL_COMMENT, method: 'get' }); 

  const showEdit = (id: any) => {
    const findId = allComment.data.find((index: any) => index.id == id);
    if (userLogin.user.id === findId.maNguoiBinhLuan) {
      return <div>
        <ButtonEditPopover idComment={id}/>
      </div>
    } else {
      return null
    }
  }; 

  const { data } = useAxios({ url: URL.JOB_COMMENT(jobDetail[0].congViec.id), method: 'get' });

  useEffect(()=>{

  },[])

  return (
    <div className='my-5 w-11/12 mx-auto'>
      <hr />
      <div className='my-5'>
        <h1 className='text-xl text-gray-600 font-bold mb-3'>Comments <CommentRounded /></h1>
      </div>
      <div>
        {(localStorage.getItem(ACCESS_TOKEN)) ? <AddComment /> : null}
      </div>
      <div className='w-full lg:w-3/4 mx-auto my-5'>
        {data ? <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={data.map((index: CommentModel) => ({
            name: index.tenNguoiBinhLuan,
            date: index.ngayBinhLuan,
            avatar: index.avatar,
            rate: index.saoBinhLuan,
            comment: index.noiDung,
            id: index.id,
          }))}
          renderItem={(item: any) => (
            <List.Item
              key={item.id}
              actions={[
                <Typography variant="body1" color="text.secondary">
                  {item.comment}
                </Typography>,
                // <span>
                //   {showEdit(item.id)}
                // </span>
              ]}
              extra={
                <Rate disabled defaultValue={item.rate} className='text-sm md:text-base'/>
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
        /> : null}
      </div>
    </div>
  )
}

export default Comment
