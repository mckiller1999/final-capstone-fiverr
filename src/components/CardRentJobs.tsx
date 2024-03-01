import { Button, Card, CardActions, CardContent } from "@mui/material";
import { JobModel } from "../models/Jobs";
import { JobModelByName } from "../pages/Search";
import { ACCESS_TOKEN, ACCESS_TOKEN_CYBER, USERLOGIN, getStorage, getStorageJson } from "../util/config";
import axios from "axios";
import { history } from "./../index";
import { UserLogin } from "../redux/reducer/userReducer";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from "react";
import * as React from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const CardRentJobs = () => {
  const data: JobModelByName[] = getStorageJson("dataBreadcrumb");
  const jobDetail: JobModel = data[0].congViec;
  const userLogin: UserLogin = getStorageJson(USERLOGIN);

  const date = new Date().toLocaleDateString();
  const postRentJobApi = async () => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      try {
        const tokenCyber = ACCESS_TOKEN_CYBER;
        const token = getStorage(ACCESS_TOKEN);
        const res = await axios({
          headers: {
            tokenCybersoft: ` ${tokenCyber}`,
            token: `${token}`,
          },
          url: `https://fiverrnew.cybersoft.edu.vn/api/thue-cong-viec`,
          method: "POST",
          data: {
            id: 0,
            maCongViec: jobDetail.id,
            maNguoiThue: userLogin.user.id,
            ngayThue: date,
            hoanThanh: false,
          },
        });
        alert('Successfull')
      } catch (error) {
        console.log(error);
      }
    } else {
      history.push("/login")
    }
  };
  const text = jobDetail.moTaNgan.split('\r\n');

  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="w-3/4 mx-auto mr-0">
      <Card>
        <CardContent>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className="mx-auto">
                <Tab label="Basic" {...a11yProps(0)} />
                <Tab label="Standard" {...a11yProps(1)} />
                <Tab label="Premium" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={+value} index={0}>
              {text.map((string) => {
                if (string === '') {
                  return ''
                } else {
                  return (
                    <div className="flex">
                      <ArrowRightIcon />
                      <p key={string} className="text-md text-gray-600"> {string}</p>
                    </div>
                  )
                }
              })}
            </CustomTabPanel>
            <CustomTabPanel value={+value} index={1}>
              {text.map((string) => {
                if (string === '') {
                  return ''
                } else {
                  return (
                    <div className="flex">
                      <ArrowRightIcon />
                      <p key={string} className="text-md text-gray-600"> {string}</p>
                    </div>
                  )
                }
              })}
            </CustomTabPanel>
            <CustomTabPanel value={+value} index={2}>
              {text.map((string) => {
                if (string === '') {
                  return ''
                } else {
                  return (
                    <div className="flex">
                      <ArrowRightIcon />
                      <p key={string} className="text-md text-gray-600"> {string}</p>
                    </div>
                  )
                }
              })}
            </CustomTabPanel>
          </Box>
        </CardContent>
        <CardActions>
          <div className="mx-auto">
            <Button variant="contained" onClick={postRentJobApi}>
              Continue with ${jobDetail.giaTien}
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
