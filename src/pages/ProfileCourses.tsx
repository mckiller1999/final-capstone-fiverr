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
import { HiredJobs } from "../models/BookedJobs";
import axios from "axios";
import { http } from "../util/config";

type Props = {
job?: HiredJobs
deleteJobs: (id:number|null) => Promise<void>
};

export const ProfileCourses = ({job, deleteJobs}: Props) => {



return (
  <div>
    <Card  elevation={0} sx={{ maxWidth: 800, display:"flex", direction:'row', gap: 2, border: "solid", borderColor:`rgb(226 232 240)`,borderRadius: 4   }} className="mt-4 pr-2" >
      <div></div>
      <CardMedia
        component="img"
        alt="green iguana"
        sx={{ width: 240, borderRadius: 6, backgroundSize: "cover"}}
        image={job?.congViec.hinhAnh}
        className="py-2"
      />
      <Box>
      <CardContent>
        <div  style={{fontFamily: '"Inter", sans-serif', fontSize: 20, fontWeight: 500, marginTop: 16, marginBottom: 16}}>
          {job?.congViec.tenCongViec}
        </div>
        <Typography variant="body2" color="text.secondary">
        {job?.congViec.moTaNgan}
        </Typography>
      </CardContent>
      <CardActions className="justify-end mb-2">
        <Button disableElevation size="small" variant="contained" color="success" sx={{borderRadius: 8}}>View details</Button>
        <Button size="small" variant="outlined">Edit</Button>
        <Button size="small" variant="outlined" color="error" onClick={()=>{deleteJobs((job?.id)? job?.id : null)}}>Delete</Button>
      </CardActions>
      </Box>

    </Card>
  </div>
);
};
