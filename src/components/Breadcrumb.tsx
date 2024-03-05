import { Breadcrumb } from 'antd';
import { useSelector } from 'react-redux';

const BreadcrumbComponent = () => {
    const jobDetail = useSelector((state:any)=>state?.jobDetailReducer?.jobDetail);
    
    return (
        <div>
            <Breadcrumb
                separator=">"
                items={[
                    {
                        title: `${jobDetail[0].tenLoaiCongViec}`,
                    },
                    {
                        title: `${jobDetail[0].tenNhomChiTietLoai}`,
                    },
                    {
                        title: `${jobDetail[0].tenChiTietLoai}`,
                    },
                ]}
            />
        </div>
    );
};

export default BreadcrumbComponent;