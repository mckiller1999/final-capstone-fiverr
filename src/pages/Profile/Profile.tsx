import { Add } from "@mui/icons-material";
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

import { BookedJobs } from "../../models/BookedJobs";
import { http } from "../../util/config";
import UserProfileEdit from "./UserProfileEdit";
import { openEditForm } from "../../redux/reducer/userEditFormReducer";
import { logoutActionApi } from "../../redux/reducer/userReducer";

type Props = {};

const Profile = (props: Props) => {
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  console.log("userLogin", userLogin);
  const [bookedJobs, setBookedJobs] = useState<BookedJobs[]>([]);

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
          <Container className="bg-white py-6">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 100, height: 100 }}
              />
              <Typography align="center" variant="subtitle1">
                {userLogin?.user.name}
              </Typography>
              <IconButton
                onClick={() => {
                  dispatch(openEditForm());
                }}
                aria-label="edit"
              >
                <EditIcon />
              </IconButton>
            </Box>

            <Divider></Divider>
            {/* Stack */}
            <Stack
              direction="row"
              spacing={8}
              className="flex justify-between my-2 "
            >
              <Stack direction="row" spacing={2}>
                <LocationOnIcon />
                <Typography variant="body2" color="text.secondary">
                  From
                </Typography>
              </Stack>
              <Typography variant="subtitle2">Vietnam</Typography>
            </Stack>
            {/* Stack */}
            {/* Stack */}
            <Stack
              direction="row"
              spacing={8}
              className="flex justify-between my-2"
            >
              <Stack direction="row" spacing={2}>
                <PersonIcon />
                <Typography variant="body2" color="text.secondary">
                  Member since
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
          <Container className="bg-white mt-6 py-4">
            <Stack
              direction="row"
              spacing={2}
              className="flex justify-between my-2"
            >
              <Typography variant="subtitle1">Description</Typography>
              <Button variant="text" size="small">
                Edit description
              </Button>
            </Stack>
            <Divider></Divider>

            <Stack direction="column" className="my-4">
              <Stack direction="row" className="flex justify-between">
                <Typography variant="subtitle1">Language</Typography>
                <Button variant="text" size="small">
                  Add new
                </Button>
              </Stack>
              <Typography variant="subtitle2" className="text-slate-500">
                English: Basic
              </Typography>
            </Stack>

            <Divider></Divider>
            <Stack direction="column" className="my-4" gap={1}>
              <Typography variant="subtitle1">Linked Account</Typography>
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
            <Stack direction="column" className="my-4">
              <Stack direction="row" className="flex justify-between">
                <Typography variant="subtitle1">Skills</Typography>
                <Button variant="text" size="small">
                  Add new
                </Button>
              </Stack>
              <Typography
                variant="subtitle2"
                className="text-slate-500"
                color="text.secondary"
              >
                Add your skills
              </Typography>
            </Stack>
            <Divider></Divider>
            <Stack direction="column" className="my-4">
              <Stack direction="row" className="flex justify-between">
                <Typography variant="subtitle1">Education</Typography>
                <Button variant="text" size="small">
                  Add new
                </Button>
              </Stack>
              <Typography variant="subtitle2" color="text.secondary">
                Add your education
              </Typography>
            </Stack>
            <Divider></Divider>
            <Stack direction="column" className="my-4">
              <Stack direction="row" className="flex justify-between">
                <Typography variant="subtitle1">Certifications</Typography>
                <Button variant="text" size="small">
                  Add new
                </Button>
              </Stack>
              <Typography variant="subtitle2" color="text.secondary">
                Add your certification
              </Typography>
            </Stack>
          </Container>
        </Grid>
        <Grid item>
          <Container>
            {bookedJobs?.map((job: BookedJobs) => {
              return <ProfileCourses job={job} />;
            })}
            <ProfileCourses />
            <ProfileCourses />
            <ProfileCourses />
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
