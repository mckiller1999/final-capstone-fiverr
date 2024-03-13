import { Button, Card, CardActions, CardContent } from "@mui/material";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_CYBER,
  USERLOGIN,
  getStorage,
  getStorageJson,
} from "../util/config";
import axios from "axios";
import { history } from "./../index";
import { UserLogin } from "../redux/reducer/userReducer";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useSelector } from "react-redux";
import { notify } from "../constants/alert";

const CardRentJobs = () => {
  const jobDetail = useSelector(
    (state: any) => state?.jobDetailReducer?.jobDetail
  );
  const userLogin: UserLogin = getStorageJson(USERLOGIN);
  const date = new Date().toLocaleDateString();

  const postRentJobApi = async () => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      try {
        const tokenCyber = ACCESS_TOKEN_CYBER;
        const token = getStorage(ACCESS_TOKEN);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const res = await axios({
          headers: {
            tokenCybersoft: ` ${tokenCyber}`,
            token: `${token}`,
          },
          url: `https://fiverrnew.cybersoft.edu.vn/api/thue-cong-viec`,
          method: "POST",
          data: {
            id: 0,
            maCongViec: jobDetail[0].congViec.id,
            maNguoiThue: userLogin.user.id,
            ngayThue: date,
            hoanThanh: false,
          },
        });
        notify("success", "Hired Successfully");
      } catch (error) {
        notify("error", "Hired Fail");
      }
    } else {
      history.push("/login");
    }
  };

  const text = jobDetail[0].congViec.moTaNgan.split("\r\n");

  return (
    <div className="w-3/4 mx-auto md:mr-0">
      <Card>
        <CardContent>
          <div className="mx-auto text-center">
            <span className="font-bold text-blue-600 text-xl uppercase">
              Start working with me
            </span>
          </div>
          <hr className="my-3" />
          {text?.map((string: any) => {
            if (string === "") {
              return <div key={string}></div>;
            } else {
              return (
                <div className="flex" key={string}>
                  <ArrowRightIcon />
                  <p className="text-md text-gray-600"> {string}</p>
                </div>
              );
            }
          })}
        </CardContent>
        <CardActions>
          <div className="mx-auto">
            <Button variant="contained" onClick={postRentJobApi}>
              Continue with ${jobDetail[0].congViec.giaTien}
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
            <Button
              variant="outlined"
              onClick={() => {
                notify("error", "Error");
              }}
            >
              Get a quote
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default CardRentJobs;
