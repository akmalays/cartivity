import { useSelector } from 'react-redux';

import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { Avatar, Badge, Button, Divider, Grid, IconButton, Tooltip } from '@mui/material';

import { RootState } from '../../app/store';
import { useChangePage } from '../../hooks/layouts/useChangePage';
import { LayoutStyles } from './LayoutStyles';

function Topbar() {
  const {changeToShopPage} = useChangePage();
  const {pageType} = useSelector((state: RootState) => state.userStore);
  return (
    <>
      <Grid display={"flex"} justifyContent={"flex-end"} alignItems="center" gap={2}>
        {pageType !== "shop" && (
          <Button onClick={changeToShopPage} sx={LayoutStyles.actionButton}>
            <StorefrontOutlinedIcon fontSize="small" sx={{mr: 1}} />
            Shop Now
          </Button>
        )}
        <Tooltip title="Your Cart" placement="bottom">
          <IconButton>
            <Badge color="secondary" badgeContent={0} showZero>
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications" placement="bottom">
          <IconButton>
            <Badge badgeContent={4} color="secondary">
              <NotificationsNoneOutlinedIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Avatar sx={{ml: 1, cursor: "pointer"}} alt="user avatar" src="" />
      </Grid>
      <Divider sx={{py: 1}} />
    </>
  );
}

export default Topbar;
