import { Button, Card, CardActions, CardContent } from "@mui/material";
import { ACCESS_TOKEN, ACCESS_TOKEN_CYBER } from "../util/config";
import axios from "axios";
import { history } from "./../index";
import { notify } from "../constants/alert";
import { useDispatch, useSelector } from "react-redux";
import { setShowing } from "../redux/reducer/loadingReducer";
import { Steps } from "antd";

const HiredJobComplete = () => {
  const jobHired = useSelector((state: any) => state?.jobDetailReducer?.jobHired);
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
          <div className="my-5"></div>
          {(jobHired.hoanThanh === true) ? <Steps
            direction="vertical"
            current={3}
            items={[
              {
                title: 'Finished',
                description: `Hired ${jobHired.ngayThue}`,
              },
              {
                title: 'Finished',
                description: 'Job is working'
              },
              {
                title: 'Finished',
                description: 'Payment for job',
              },
            ]}
          /> : <Steps
            direction="vertical"
            current={2}
            items={[
              {
                title: 'Finished',
                description: `Hired ${jobHired.ngayThue}`,
              },
              {
                title: 'Finished',
                description: 'Job is working'
              },
              {
                title: 'In Progress',
                description: 'Payment for job',
              },
            ]}
          />
          }
        </CardContent>
        <CardActions>
          <div className="mx-auto">
            {(jobHired.hoanThanh === true) ? <Button variant="contained" onClick={completeHiredJob} disabled>
              Complete
            </Button> : <Button variant="contained" onClick={completeHiredJob}>
              Complete
            </Button>}
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default HiredJobComplete;


