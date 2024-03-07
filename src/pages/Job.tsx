import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { PlayCircleFilled } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import URL from "../constants/url";

const Job = () => {
  const param = useParams();

  const { data, error, loading } = useAxios({ url: URL.JOB_BY_MENU(param?.id), method: 'get' })

  console.log({ data, error, loading });

  return <div>
    <div className="container mx-auto mt-5">
      <div>
        <div className="bg-gray-600 py-5 text-center rounded-lg">
          <h1>{data?.[0]?.tenLoaiCongViec}</h1>
          <p>desc</p>
          <Button variant="outlined" color="success">
            <PlayCircleFilled fontSize='small' className="mr-1" />
            How Fiverr Works</Button>
        </div>
      </div>
      <div>
        {data?.map((index: any) => {
          return <div key={index?.id}>
            <Card elevation={0} sx={{ maxWidth: 800, display: "flex", direction: 'row', gap: 2, border: "solid", borderColor: `rgb(226 232 240)`, borderRadius: 4 }} className="mt-4 pr-2" >
              <CardMedia
                component="img"
                alt="green iguana"
                sx={{ width: 240, borderRadius: 6, backgroundSize: "cover" }}
                image={index.congViec.hinhAnh}
                className="py-2"
              />
              <Box>
                <CardContent>
                  <div style={{ fontFamily: '"Inter", sans-serif', fontSize: 20, fontWeight: 500, marginTop: 16, marginBottom: 16 }}>
                    {index.congViec.tenCongViec}
                  </div>
                  <Typography variant="body2" color="text.secondary">
                    {index.congViec.moTaNgan}
                  </Typography>
                </CardContent>
                <CardActions className="justify-end mb-2">
                  <Button disableElevation size="small" variant="contained" color="success" sx={{ borderRadius: 8 }}>View details</Button>
                </CardActions>
              </Box>
            </Card>
          </div>
        })}
      </div>
      <div className="">
      </div>
    </div>
  </div>;
};

export default Job;
