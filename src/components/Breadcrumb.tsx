import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { JobModelByName } from '../pages/Search';
import { getStorageJson } from '../util/config';

type Props = {};

const BreadcrumbComponent = () => {
    const [data, setData] = useState<JobModelByName[]>();
    const getData = () => {
        const data : JobModelByName[] = getStorageJson('dataBreadcrumb');
        setData(data);
    };

    useEffect(()=>{
        getData()
    }, []);

    // const data : JobModelByName[] = getData();

    return (
        <Breadcrumb
            separator=">"
            items={[
                {
                    title: `${data}`,
                },
                {
                    title: `$}`,
                },
                {
                    title: `$prod?.tenChiTietLoai`,
                },
            ]}
        />
    );
};

export default BreadcrumbComponent;