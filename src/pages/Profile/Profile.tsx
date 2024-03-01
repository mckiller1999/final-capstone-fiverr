import { Add, Delete, HomeRepairServiceOutlined } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProfileCourses } from "../ProfileCourses";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import axios from "axios";
import { BookedJobs, HiredJobs } from "../../models/BookedJobs";
import { http } from "../../util/config";
import UserProfileEdit from "./UserProfileEdit";
import { openEditForm } from "../../redux/reducer/userEditFormReducer";
import { logoutActionApi } from "../../redux/reducer/userReducer";
import "../../index.css";
import "../../style.css";
import { Tag } from "antd";
import EmptyJobs from "../../components/EmptyJobs";

type Props = {};

const Profile = (props: Props) => {
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  console.log("userLogin", userLogin);
  const [bookedJobs, setBookedJobs] = useState<HiredJobs[]>([]);

  const getApiBookedJobs = async () => {
    try {
      const res = await http.get("thue-cong-viec/lay-danh-sach-da-thue");
      console.log(res.data.content);
      setBookedJobs(res.data.content);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getApiBookedJobs();
  }, []);

  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="bg-gray-100 py-8 px-14 ">
      <UserProfileEdit />
      <Grid container columnGap={4} className="flex justify-center">
        <Grid item xs={3}>
          <Container
            className="bg-white py-6"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 6,
              }}
              style={{
                backgroundImage: `url(/img/5465793.jpg)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "100%",
                height: "250px",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 100, height: 100 }}
              />
            </Box>
            <div
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 24,
                fontWeight: 500,
                marginTop: 16,
              }}
            >
              {userLogin?.user.name}
            </div>
            <IconButton
              onClick={() => {
                dispatch(openEditForm());
              }}
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
            <Divider></Divider>
            {/* Stack */}
            <Stack direction="row" spacing={1} className="flex my-2 ">
              <Stack direction="row" spacing={2}>
                {/* <LocationOnIcon /> */}
                <Typography variant="body2" color="text.secondary">
                  From:
                </Typography>
              </Stack>
              <Typography variant="subtitle2">Vietnam</Typography>
            </Stack>
            {/* Stack */}
            {/* Stack */}
            <Stack
              direction="row"
              spacing={1}
              className="flex justify-between my-2"
            >
              <Stack direction="row" spacing={1}>
                {/* <PersonIcon /> */}
                <Typography variant="body2" color="text.secondary">
                  Member since:
                </Typography>
              </Stack>
              <Typography variant="subtitle2">May 2021</Typography>
            </Stack>
            {/* Stack */}
            <Divider></Divider>
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<LogoutIcon />}
              onClick={() => {
                dispatch(logoutActionApi());
              }}
            >
              Log out
            </Button>
          </Container>
          <Container className="bg-white mt-6 py-10" sx={{ borderRadius: 8 }}>
            <Stack
              direction="row"
              spacing={2}
              className="flex justify-between my-8"
            >
              <div
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                Description
              </div>
              <Button variant="text" size="small">
                Edit description
              </Button>
            </Stack>
            <Divider></Divider>

            <Stack direction="column" className="my-8">
              <Stack direction="row" className="flex justify-between">
                <div
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 20,
                    fontWeight: 500,
                  }}
                >
                  Language
                </div>
                <Button variant="text" size="small">
                  Add new
                </Button>
              </Stack>
              <Typography variant="subtitle2" className="text-slate-500">
                English: Basic
              </Typography>
            </Stack>

            <Divider></Divider>
            <Stack direction="column" className="my-8" gap={1}>
              <div
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                Linked Account
              </div>

              <Button variant="text" size="small" startIcon={<Add />}>
                Facebook
              </Button>
              <Button variant="text" size="small" startIcon={<Add />}>
                Google
              </Button>
              <Button variant="text" size="small" startIcon={<Add />}>
                Dribbble
              </Button>
              <Button variant="text" size="small" startIcon={<Add />}>
                Stack Overflow
              </Button>
              <Button variant="text" size="small" startIcon={<Add />}>
                Github
              </Button>
              <Button variant="text" size="small" startIcon={<Add />}>
                Vimeo
              </Button>
              <Button variant="text" size="small" startIcon={<Add />}>
                Twitter
              </Button>
            </Stack>
            <Divider></Divider>
            <Stack direction="column" className="my-8">
              <Stack direction="row" className="flex justify-between">
                <div
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 20,
                    fontWeight: 500,
                  }}
                >
                  Skills
                </div>
                <Button variant="text" size="small">
                  Add new
                </Button>
              </Stack>
              {!userLogin?.user.skill || userLogin?.user.skill.length == 0 ? (
                <Typography
                  variant="subtitle2"
                  className="text-slate-500"
                  color="text.secondary"
                >
                  Add your skills
                </Typography>
              ) : (
                userLogin?.user.skill.map((item) => {
                  return (
                    <div>
                      <Tag
                        style={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: 16,
                          fontWeight: 400,
                          marginBottom: 8,
                        }}
                        color="magenta"
                      >
                        {item}
                      </Tag>
                    </div>
                  );
                })
              )}
            </Stack>
            <Divider></Divider>
            <Stack direction="column" className="my-8">
              <Stack direction="row" className="flex justify-between">
                <div
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 20,
                    fontWeight: 500,
                  }}
                >
                  Education
                </div>

                <Button variant="text" size="small">
                  Add new
                </Button>
              </Stack>
              <Typography variant="subtitle2" color="text.secondary">
                Add your education
              </Typography>
            </Stack>
            <Divider></Divider>
            <Stack direction="column" className="my-8">
              <Stack direction="row" className="flex justify-between">
                <div
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: 20,
                    fontWeight: 500,
                  }}
                >
                  Certifications
                </div>
                <Button variant="text" size="small">
                  Add new
                </Button>
              </Stack>
              {(!userLogin?.user.certification ||
                userLogin?.user.certification.length) == 0 ? (
                <Typography variant="subtitle2" color="text.secondary">
                  Add your certification
                </Typography>
              ) : (
                userLogin?.user.certification.map((item) => {
                  return (
                    <div>
                      <Tag
                        style={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: 16,
                          fontWeight: 400,
                          marginBottom: 8,
                        }}
                        color="cyan"
                      >
                        {item}
                      </Tag>
                    </div>
                  );
                })
              )}
            </Stack>
          </Container>
        </Grid>
        <Grid item>
        <Container sx={{width:800}}>
            {(bookedJobs.length == 0) ? <EmptyJobs /> : (bookedJobs?.map((job: HiredJobs) => {
              return <ProfileCourses key={job.id} job={job} />;
            }))}

          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
