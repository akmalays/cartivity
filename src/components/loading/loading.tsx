import { Box, CircularProgress, Grid, Typography } from '@mui/material';

function Loading() {
  return (
    <div>
      <Grid container sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "70vh", gap: 4}}>
        <CircularProgress color="inherit" />
        <Typography fontSize={14} fontWeight={300}>
          Please wait, your page is being processed ...
        </Typography>
      </Grid>
    </div>
  );
}

export default Loading;
