import {
    Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { BookedJobs } from "../models/BookedJobs";

type Props = {
  job?: BookedJobs
};

export const ProfileCourses = ({job}: Props) => {
  return (
    <div>
      <Card sx={{ maxWidth: 800, display:"flex", direction:'row', gap: 2  }} className="px-4 mt-4" >
        <CardMedia
          component="img"
          alt="green iguana"
          sx={{ width: 200 }}
          image="https://www.w3schools.com/images/w3schools_green.jpg"
        />
        <Box>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {job?.maCongViec}
            Front End Programming with ReactJS
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
          </Typography>
        </CardContent>
        <CardActions className="justify-end">
          <Button size="small" variant="contained" color="success">View details</Button>
          <Button size="small" variant="outlined">Edit</Button>
          <Button size="small" variant="outlined" color="error">Delete</Button>
        </CardActions>
        </Box>
 
      </Card>
    </div>
  );
};
