import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

type TViewMenuJob = {
  id: any;
};

export const ViewMenuJob = ({ id }: TViewMenuJob) => {
  return (
    <div>
      <Card
        elevation={0}
        sx={{
          maxWidth: 800,
          gap: 2,
          border: "solid",
          borderColor: `rgb(226 232 240)`,
          borderRadius: 4,
          display: { sm: "flex", md: "flex" },
          flexDirection: { sm: "column", md: "row" },
        }}
        className="mt-4 pr-2"
      >
        <CardMedia
          component="img"
          alt="green iguana"
          sx={{ width: "100%", borderRadius: 6, backgroundSize: "cover" }}
          className="py-2"
        />
        <Box>
          <CardContent>
            <div
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 20,
                fontWeight: 500,
                marginTop: 16,
                marginBottom: 16,
              }}
            ></div>
            <Typography variant="body2" color="text.secondary"></Typography>
          </CardContent>
          <CardActions className="justify-end mb-2">
            <Button
              disableElevation
              size="small"
              variant="contained"
              color="success"
              sx={{ borderRadius: 8 }}
            >
              View details
            </Button>
            <Button size="small" variant="outlined">
              Edit
            </Button>
            <Button size="small" variant="outlined" color="error">
              Delete
            </Button>
          </CardActions>
        </Box>
      </Card>
    </div>
  );
};
