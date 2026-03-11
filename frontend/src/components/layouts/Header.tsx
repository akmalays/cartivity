import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';

import { RootState } from '../../app/store';
import Topbar from '../../components/layouts/Topbar';
import { useChangePage } from '../../hooks/layouts/useChangePage';
import { openConfirmationModal } from '../../store/modal/modalStore';
import { setCategoryActive, setIsShopPageLoading } from '../../store/shop/shopStore';
import { LayoutStyles } from './LayoutStyles';

interface TaskStats {
  totalHours: number;
  completedTasks: number;
  pendingTasks: number;
}

function Header() {
  const dispatch = useDispatch();
  const [stats, setStats] = useState<TaskStats>({
    totalHours: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });
  const {pageType} = useSelector((state: RootState) => state.userStore);
  const {categoryActive} = useSelector((state: RootState) => state.shopStore);
  const tasks = useSelector((state: RootState) => state.taskStore.tasks);
  const {changeToTaskPage} = useChangePage();

  function createTask() {
    dispatch(
      openConfirmationModal({
        type: "create",
        title: "Create your new task here",
        description: "Fill the input field below to create your task",
        onConfirm: () => {},
      })
    );
  }

  function changeShopActiveCategory(categoryActive: "special price" | "best seller" | "new products") {
    dispatch(setCategoryActive({categoryActive}));
    dispatch(setIsShopPageLoading({isShopPageLoading: true}));
    setTimeout(() => {
      dispatch(setIsShopPageLoading({isShopPageLoading: false}));
    }, 2000);
  }

  function getTodayDateString() {
    const today = new Date();

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const dayName = days[today.getDay()];
    const date = today.getDate();
    const monthName = months[today.getMonth()];
    const year = today.getFullYear();

    return `${dayName}, ${date} ${monthName} ${year}`;
  }
  function updateStats() {
    setStats({
      totalHours: tasks.reduce((sum, task) => sum + task.duration, 0),
      completedTasks: tasks.filter((task) => task.done).length,
      pendingTasks: tasks.filter((task) => !task.done).length,
    });
  }

  useEffect(() => {
    updateStats();
  }, [tasks]);

  return (
    <div>
      <Grid container direction="column">
        <Topbar />
        {/* welcome sign */}
        <Grid>
          <Typography sx={{fontSize: 16, fontWeight: 300, pt: 2}}> {getTodayDateString()}</Typography>
        </Grid>
        <Grid container display="flex" justifyContent="space-between">
          <Grid container>
            <Grid>
              <Typography sx={{fontSize: 32, fontWeight: 500, mt: 2}}> "Good Morning! Adi," </Typography>
              {pageType === "shop" && (
                <Typography sx={{fontSize: 16, fontWeight: 300}}>
                  "Your
                  <Box component="span" sx={{fontWeight: "bold"}}>
                    {" "}
                    3{" "}
                  </Box>
                  unpurchased items may sell out soon - secure them now!"
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container display="flex" justifyContent="center" alignItems="center" gap={2}>
            {pageType !== "shop" ? (
              <>
                <Button sx={LayoutStyles.actionButtonNoHover}>
                  <ShareOutlinedIcon fontSize="small" sx={{mr: 1}} />
                  Share
                </Button>
                <Button onClick={createTask} sx={LayoutStyles.actionButtonNoHover}>
                  <AddOutlinedIcon fontSize="small" sx={{mr: 1}} />
                  Add Task
                </Button>
              </>
            ) : (
              <Button onClick={changeToTaskPage} sx={LayoutStyles.actionButtonNoHover}>
                <ArrowBackIosNewOutlinedIcon fontSize="small" sx={{mr: 1}} />
                Back
              </Button>
            )}
          </Grid>
        </Grid>

        {/* task allocated sign  */}
        {pageType === "shop" ? (
          <>
            <Grid container sx={{display: "flex", justifyContent: "space-between", pt: 6}}>
              <Typography sx={{fontSize: 36, fontWeight: "bold"}}>Discover Products</Typography>
              <Grid container display="flex" justifyContent="center" alignItems="center" gap={1}>
                <Button
                  onClick={() => changeShopActiveCategory("special price")}
                  sx={categoryActive === "special price" ? LayoutStyles.shopCategoryActiveButton : LayoutStyles.shopCategoryButton}>
                  Special Price
                </Button>
                <Button
                  onClick={() => changeShopActiveCategory("best seller")}
                  sx={categoryActive === "best seller" ? LayoutStyles.shopCategoryActiveButton : LayoutStyles.shopCategoryButton}>
                  Best Seller
                </Button>
                <Button
                  onClick={() => changeShopActiveCategory("new products")}
                  sx={categoryActive === "new products" ? LayoutStyles.shopCategoryActiveButton : LayoutStyles.shopCategoryButton}>
                  New Products
                </Button>
              </Grid>
            </Grid>
            <Divider sx={{pt: 2}} />
          </>
        ) : (
          <Grid
            container
            sx={{display: "flex", justifyContent: "space-around", backgroundColor: "#f0f0f0", border: "solid 1px #d3d3d3", borderRadius: "40px", px: 4, py: 2, marginTop: 5}}>
            <Grid display="flex" alignItems="center" gap={2}>
              <AccessAlarmsIcon sx={{mb: 0.5}} />
              <Grid display="flex" alignItems="center" gap={1}>
                <Typography fontWeight="bold" fontSize={20}>
                  {stats.totalHours} hrs
                </Typography>
                <Typography fontWeight="light">Total Time</Typography>
              </Grid>
            </Grid>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderRightWidth: 2,
                "@media (max-width: 599px)": {
                  display: "none",
                },
              }}
            />
            <Grid display="flex" alignItems="center" gap={2}>
              <TaskAltIcon sx={{mb: 0.5}} />
              <Grid display="flex" alignItems="center" gap={1}>
                <Typography fontWeight="bold" fontSize={20}>
                  {stats.completedTasks} Tasks
                </Typography>
                <Typography fontWeight="light">Completed</Typography>
              </Grid>
            </Grid>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderRightWidth: 2,
                "@media (max-width: 599px)": {
                  display: "none",
                },
              }}
            />
            <Grid display="flex" alignItems="center" gap={2}>
              <HourglassTopIcon sx={{mb: 0.5}} />
              <Grid display="flex" alignItems="center" gap={1}>
                <Typography fontWeight="bold" fontSize={20}>
                  {stats.pendingTasks} Tasks
                </Typography>
                <Typography fontWeight="light">In-Progress</Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Header;
