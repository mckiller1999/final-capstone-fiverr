import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
// import { Button } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { JobModelByName } from '../pages/Search';
import { useEffect, useState } from 'react';
import { ACCESS_TOKEN_CYBER, saveStorageJson } from "../util/config";
import axios from 'axios';
import Box from '@mui/material/Box';
import { JobModel } from '../models/Jobs';
import { Button, CardActionArea } from '@mui/material';

type Props = {
    prod?: JobModelByName;
    data?: JobModel
};

const CardJob = ({ prod, data }: Props) => {
    const [favorite, setFavorite] = useState(false);
    const handleClickFavorite = () => {
        console.log(prod);
        setFavorite(!favorite)
    };

    const [productDetail, setProductDetail] = useState<JobModelByName[]>([]);

    const getProductDetailApi = async () => {
        try {
            const token = ACCESS_TOKEN_CYBER;
            const res = await axios({
                headers: {
                    tokenCybersoft: ` ${token}`,
                },
                url: `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-cong-viec-chi-tiet/${prod?.id}`,
            });
            setProductDetail(res.data.content);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getProductDetailApi()
    }, []);

    const navigate = useNavigate();
    const handleClickCard = () => {
        saveStorageJson('dataBreadcrumb', productDetail);
        navigate(`/detail/${prod?.id}`);
    };

    return (
        <Card sx={{ maxWidth: 600 }}>
            <CardActionArea onClick={handleClickCard}>
                <CardMedia
                    component="img"
                    height="194"
                    image={prod?.congViec.hinhAnh}
                    alt={prod?.congViec.hinhAnh}
                />
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={prod?.avatar}></Avatar>
                    }
                    title={prod?.tenNguoiTao}
                    subheader='Level ???'
                />
                <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                        {prod?.congViec.tenCongViec}
                    </Typography>
                    <div className='mt-3 flex'>
                        <Box>
                            <Rating name="half-rating-read" value={prod?.congViec.saoCongViec} precision={0.5} readOnly getLabelText={() => 'star'} />
                        </Box>
                        <span className='ml-2 text-gray-600'>({prod?.congViec.danhGia})</span>
                    </div>
                </CardContent>
            </CardActionArea>
            <hr />
            <CardActions disableSpacing className='flex justify-between'>
                <IconButton aria-label="add to favorites" onClick={handleClickFavorite} className='z-50'>
                    <FavoriteIcon className={favorite ? 'text-red-600' : ''} />
                </IconButton>
                <Typography variant="subtitle2" color="text.secondary">
                    Starting at
                    <span className='text-black text-lg '> ${prod?.congViec.giaTien}</span>
                </Typography>
            </CardActions>
        </Card>
    )
}

export default CardJob