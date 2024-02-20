import React, { useEffect, useState } from "react";
import axios from "axios";
import { ACCESS_TOKEN_CYBER } from "../util/config";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { JobCategoryModel } from '../models/JobDetail';

type Props = {};

const CatogeryTab = (props: Props) => {
    const [arrProductJob, setArrProductJob] = useState<JobCategoryModel[]>([]);
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
            //console.log(res);
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
                key: `${prod.id}`,
                children:
                    prod.dsNhomChiTietLoai[0]?.dsChiTietLoai.map((item) => (
                        {
                            label: `${item.tenChiTiet}`,
                            key: `${item.id}`
                        }
                    )),
            }
        ))
    ;
    const [current, setCurrent] = useState('');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default CatogeryTab;