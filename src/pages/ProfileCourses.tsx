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
      <Card  elevation={0} sx={{ maxWidth: 800, display:"flex", direction:'row', gap: 2, border: "solid", borderColor:`rgb(226 232 240)`,borderRadius: 4   }} className=" mt-4" >
        <div></div>
        <CardMedia
          component="img"
          alt="green iguana"
          sx={{ width: 400, height: 200 , borderRadius: 4}}
          image="/img/imgbg-1.jpg"
          className="py-2"
        />
        <Box>
        <CardContent>
          <div  style={{fontFamily: '"Inter", sans-serif', fontSize: 24, fontWeight: 500, marginTop: 16, marginBottom: 16}}>
            {job?.maCongViec}
            Front End Programming with ReactJS
          </div>
          <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
          </Typography>
        </CardContent>
        <CardActions className="justify-end">
          <Button disableElevation size="small" variant="contained" color="success" sx={{borderRadius: 8}}>View details</Button>
          <Button size="small" variant="outlined">Edit</Button>
          <Button size="small" variant="outlined" color="error">Delete</Button>
        </CardActions>
        </Box>
 
      </Card>
    </div>
  );
};
