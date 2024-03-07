import { useState } from "react";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { JobCategoryModel } from '../models/JobDetail';
import { NavLink, useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import URL from "../constants/url";

const CatogeryTab = () => {
    const [current, setCurrent] = useState('');
    const navigate = useNavigate();
    const { data } = useAxios({ url: URL.JOB_MENU, method: 'get' });

    const items: MenuProps['items'] =
        data?.map((prod: JobCategoryModel) => (
            {
                label: (<NavLink to={`/job/${prod.id}`}>{prod.tenLoaiCongViec}</NavLink>),
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
        navigate(`/job-view/${e.key?.split('/')?.[1]}`)
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default CatogeryTab;