import { Breadcrumb } from 'antd';
import { JobModelByName } from '../pages/Search';
import { getStorageJson } from '../util/config';

type Props = {};

const BreadcrumbComponent = () => {
    const data: JobModelByName[] = getStorageJson('dataBreadcrumb');
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