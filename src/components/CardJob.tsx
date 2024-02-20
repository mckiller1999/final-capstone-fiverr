import * as React from 'react';
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
import { JobModel } from '../models/Jobs';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Props = {
    prod?: JobModel;
};

const CardJob = ({ prod }: Props) => {
    const [favorite, setFavorite] = React.useState(false);
    const handleClickFavorite = () => {
        console.log(prod);

        setFavorite(!favorite)
    };

    const navigate = useNavigate();
    const handleClickCard = () => {
        navigate(`/detail/${prod?.id}`)
    };
    return (
        <Button onClick={handleClickCard}>
            <Card sx={{ maxWidth: 600 }}>
                <CardMedia
                    component="img"
                    height="194"
                    image={prod?.hinhAnh}
                    alt={prod?.hinhAnh}
                />
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            A
                        </Avatar>
                    }
                    title='Anonymos'
                    subheader='Level ???'
                />
                <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                        {prod?.tenCongViec}
                    </Typography>
                    <div className='mt-3 flex items-center'>
                        <Stack spacing={1}>
                            <Rating name="half-rating-read" defaultValue={prod?.saoCongViec} precision={0.5} readOnly />
                        </Stack>
                        <span className='ml-2 text-gray-600'>({prod?.danhGia})</span>
                    </div>
                </CardContent>
                <hr />
                <CardActions disableSpacing className='flex justify-between'>
                    <IconButton aria-label="add to favorites" onClick={handleClickFavorite}>
                        <FavoriteIcon className={favorite ? 'text-red-600' : ''} />
                    </IconButton>
                    <Typography variant="subtitle2" color="text.secondary">
                        Starting at
                        <span className='text-black text-lg '> ${prod?.giaTien}</span>
                    </Typography>
                </CardActions>
            </Card>
        </Button>
    )
}

export default CardJob