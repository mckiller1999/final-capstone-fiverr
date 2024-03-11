import {
  Box,
  Button, Card, CardContent, CardMedia, Typography,
} from "@mui/material";
import { PlayCircleFilled } from "@mui/icons-material";
import { NavLink, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import URL from "../../constants/url";
import { DsChiTietLoai, DsNhomChiTietLoai } from "../../models/JobDetail";
import { Tabs } from "antd";
import ArrowRight from "@mui/icons-material/ArrowRight";

const Job = () => {
  const param = useParams();

  const { data } = useAxios({ url: URL.JOB_BY_MENU(param?.id), method: 'get' });

  return <div>
    {data ? <div className="max-w-7xl mx-auto">
      <div className="py-5 text-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 w-full mx-auto mt-5" >
        <h1 className="my-3 font-bold text-3xl text-white">{data[0].tenLoaiCongViec}</h1>
        <Button variant="contained" color="success">
          <PlayCircleFilled fontSize='small' className="mr-1" />
          How Fiverr Works</Button>
      </div>
      <div>
        <Tabs
          defaultActiveKey="1"
          centered
          items={data[0].dsNhomChiTietLoai.map((index: DsNhomChiTietLoai) => {
            return {
              label: <span className="text-lg">{index.tenNhom}</span>,
              key: index.id,
              children: <div className="mx-auto">
                <Card elevation={0} sx={{ maxWidth: 800, gap: 2, border: "solid", borderColor: `rgb(226 232 240)`, borderRadius: 4, display: { sm: "flex", md: "flex" }, flexDirection: { sm: 'column', md: 'row' } }} className="mt-4 mx-auto p-2" >
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    sx={{ width: "60%", borderRadius: 8, backgroundSize: "center" }}
                    image={index.hinhAnh}
                    className="p-2"
                  />
                  <Box>
                    <CardContent>
                      {index.dsChiTietLoai.map((item: DsChiTietLoai) => (
                        <div className="my-3">
                          <Typography variant="h6" color="text.secondary">
                            <NavLink to={`/job-view/${item.id}`}><ArrowRight />{item.tenChiTiet}</NavLink>
                          </Typography>
                        </div>
                      ))}
                    </CardContent>
                  </Box>
                </Card>
              </div>,
            };
          })}
        />
      </div>
    </div> : null}
  </div>;
};

export default Job;
