import { Typography } from '@mui/material';
import { JobModel } from '../models/Jobs';
import { JobModelByName } from '../pages/Search';
import { getStorageJson } from '../util/config';
import { Avatar, Space, Rate, Image } from 'antd'

const ShowJobDetail = () => {
    const data: JobModelByName[] = getStorageJson('dataBreadcrumb');
    const jobDetail: JobModel = data[0].congViec;
    const checkRate = (value: Number) => {
        if (value == 5) {
            return <span className='text-yellow-700'>Top Rated Seller</span>
        } else {
            return ''
        }
    };
    return (
        <div className='container mx-auto mt-5'>
            <div>
                <h2 className='text-2xl text-gray-800 font-bold'>{jobDetail.tenCongViec}</h2>
            </div>
            <div className='flex my-3'>
                <Space direction="vertical" size={16}>
                    <Space wrap size={10}>
                        <Avatar size={50} src={data[0].avatar} />
                        <span className='font-bold'>{data[0].tenNguoiTao}</span>
                        {checkRate(jobDetail.saoCongViec)}
                        <div className='flex border-l-2 border-gray-400 pl-2'>
                            <Rate disabled defaultValue={jobDetail.saoCongViec} />
                            <span className='ml-2 text-gray-600'>({jobDetail.danhGia})</span>
                        </div>
                    </Space>
                </Space>
            </div>
            <hr className='font-bold border-gray-400' />
            <div className='mt-5 pt-3 mx-auto'>
                <Image
                    width={800}
                    src={jobDetail.hinhAnh}
                />
            </div>
            <div>
                <h1>About This Gig</h1>
                <Typography>{jobDetail.moTa}</Typography>
            </div>
        </div>
    )
}

export default ShowJobDetail