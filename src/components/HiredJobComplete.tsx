import { Button, Card, CardActions, CardContent } from "@mui/material";
import { ACCESS_TOKEN, ACCESS_TOKEN_CYBER } from "../util/config";
import axios from "axios";
import { history } from "./../index";
import { notify } from "../constants/alert";
import { useDispatch, useSelector } from "react-redux";
import { setShowing } from "../redux/reducer/loadingReducer";

const HiredJobComplete = () => {
const jobHired = useSelector((state:any)=>state?.jobDetailReducer?.jobHired);
const dispatch = useDispatch();
  const completeHiredJob = async () => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      try {
        const tokenCyber = ACCESS_TOKEN_CYBER;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const res = await axios({
          headers: {
            tokenCybersoft: ` ${tokenCyber}`,
          },
          url: `https://fiverrnew.cybersoft.edu.vn/api/thue-cong-viec/hoan-thanh-cong-viec/${jobHired.id}`,
          method: "POST",
        });
        notify('success', 'Payment Successfully');
        dispatch(setShowing(true))
      } catch (error) {
        notify('error', 'Payment Fail');
        dispatch(setShowing(false))
      }
    } else {
      history.push("/login")
    }
  };

  return (
    <div className="w-3/4 mx-auto mr-0">
      <Card>
        <CardContent>
          <div className="mx-auto text-center">
            <span className="font-bold text-blue-600 text-xl uppercase">Finish & Payment</span>
          </div>
          <hr className="my-3" />
          <div className="ml-5 mt-5">
            <h1 className="my-3">Hired Date: {jobHired?.ngayThue}</h1>
            <h1>Price: {jobHired?.congViec.giaTien}</h1>
          </div>
        </CardContent>
        <CardActions>
          <div className="mx-auto">
            <Button variant="contained" onClick={completeHiredJob}>
              Complete
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default HiredJobComplete;


