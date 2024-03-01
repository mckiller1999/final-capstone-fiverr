import { Breadcrumb } from 'antd';
import { JobModelByName } from '../pages/Search';

type Props = {
    prod: JobModelByName[]
};

const BreadcrumbComponent = ({ prod }: Props) => {
    const data = prod;
    return (
        <div>
            <Breadcrumb
                separator=">"
                items={[
                    {
                        title: `${data[0].tenLoaiCongViec}`,
                    },
                    {
                        title: `${data[0].tenNhomChiTietLoai}`,
                    },
                    {
                        title: `${data[0].tenChiTietLoai}`,
                    },
                ]}
            />
        </div>
    );
};

export default BreadcrumbComponent;