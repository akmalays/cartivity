import { useSelector } from 'react-redux';

import { Box, CircularProgress, Grid, Typography } from '@mui/material';

import { RootState } from '../app/store';
import DefaultLayout from '../components/layouts/DefaultLayout';
import Header from '../components/layouts/Header';
import Products from '../components/layouts/Products';
import Task from '../components/layouts/Task';

function HomePage() {
  const {isLoading, pageType} = useSelector((state: RootState) => state.userStore);
  return (
    <DefaultLayout>
      {isLoading ? (
        <Grid container sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "70vh", gap: 4}}>
          <CircularProgress color="inherit" />
          <Typography fontSize={14} fontWeight={300}>
            Please wait, your page is being processed ...
          </Typography>
        </Grid>
      ) : (
        <>
          <Header />
          {pageType === "shop" ? <Products /> : <Task />}
        </>
      )}
    </DefaultLayout>
  );
}
export default HomePage;
