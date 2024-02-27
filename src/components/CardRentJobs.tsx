import { Button, Card, CardActions, CardContent } from "@mui/material";
import { JobModel } from "../models/Jobs";
import { JobModelByName } from "../pages/Search";
import { ACCESS_TOKEN_CYBER, getStorageJson } from "../util/config";
import axios from "axios";

const CardRentJobs = () => {
  const data: JobModelByName[] = getStorageJson("dataBreadcrumb");
  const jobDetail: JobModel = data[0].congViec;
  const postRentJobApi = async () => {
    try {
      const tokenCyber = ACCESS_TOKEN_CYBER;
      const token = "";
      const res = await axios({
        headers: {
          tokenCybersoft: ` ${tokenCyber}`,
          token: `${token}`,
        },
        url: `https://fiverrnew.cybersoft.edu.vn/api/thue-cong-viec`,
        method: "POST",
        data: {
          id: 0,
          maCongViec: 0,
          maNguoiThue: 0,
          ngayThue: "string",
          hoanThanh: true,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-3/4 mx-auto">
      <Card>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <Button>Basic</Button>
            <Button>Standard</Button>
            <Button>Premium</Button>
          </div>
        </CardContent>
        <CardContent>
          <p className="text-md text-gray-600">{jobDetail.moTaNgan}</p>
        </CardContent>
        <CardActions>
          <div className="mx-auto">
            <Button variant="contained" onClick={postRentJobApi}>
              Continue ${jobDetail.giaTien}
            </Button>
          </div>
        </CardActions>
      </Card>
      <Card className="mt-5">
        <CardContent>
          <h1 className="text-center text-gray-600">
            Do you have any special requirements ?
          </h1>
        </CardContent>
        <CardActions>
          <div className="mx-auto">
            <Button variant="outlined">Get a quote</Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default CardRentJobs;
