import { useEffect, useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN_CYBER } from "../util/config";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { JobCategoryModel } from '../models/JobDetail';
import { useNavigate } from "react-router-dom";

type Props = {};

const CatogeryTab = (props: Props) => {
    const [arrProductJob, setArrProductJob] = useState<JobCategoryModel[]>([]);
    const [current, setCurrent] = useState('');
    const navigate = useNavigate();

    const getAllProdCateApi = async () => {
        try {
            const token = ACCESS_TOKEN_CYBER;
            const res = await axios({
                headers: {
                    tokenCybersoft: ` ${token}`,
                },
                url: "https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-menu-loai-cong-viec",
                method: "GET",
            });
            setArrProductJob(res.data.content);
        } catch (error) {
            console.log("Lỗi khi truy xuất dữ liệu:", error);
        }
    };

    useEffect(() => {
        getAllProdCateApi();
    }, []);

    const items: MenuProps['items'] =
        arrProductJob?.map((prod: JobCategoryModel) => (
            {
                label: `${prod.tenLoaiCongViec}`,
                key: `/${prod.id}`,
                children:
                    prod.dsNhomChiTietLoai.map((item) => (
                        {
                            type: 'group',
                            label: `${item.tenNhom}`,
                            key: `${prod.id}/${item.id}`,
                            id: `${item.id}`,
                            children:
                                prod.dsNhomChiTietLoai[0]?.dsChiTietLoai.map((detail) => (
                                    {
                                        label: `${detail.tenChiTiet}`,
                                        key: `${prod.id}-${item.tenNhom}/${detail.id}`,
                                        id: `${detail.id}`
                                    }
                                )),
                        }
                    )),
            }
        ))
        ;
    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key?.split('/')?.[1]);
        navigate(`/job/${e.key?.split('/')?.[1]}`)
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default CatogeryTab;