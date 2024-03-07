import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// funtion return page loading when call api
const Loading = () => {
    const isloading = useSelector((state: any) => state?.loadingReducer?.loading);

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isloading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Loading
