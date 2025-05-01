import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Logout from '@mui/icons-material/Logout';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Settings from '@mui/icons-material/Settings';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import {
    Avatar, Badge, Box, Button, Divider, Grid, IconButton, ListItemIcon, Menu, MenuItem, Popper,
    Tooltip, Typography
} from '@mui/material';

import { RootState } from '../../app/store';
import { useChangePage } from '../../hooks/layouts/useChangePage';
import { LayoutStyles } from './LayoutStyles';

function Topbar() {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState<null | HTMLElement>(null);
  const [isNotificationPopperOpen, setIsNotificationPopperOpen] = useState<boolean>(false);
  const [isCartPopperOpen, setIsCartPopperOpen] = useState<boolean>(false);
  const [anchorCart, setIsAnchorCart] = useState<null | HTMLElement>(null);
  const [anchorNotification, setIsAnchorNotification] = useState<null | HTMLElement>(null);

  const {pageType} = useSelector((state: RootState) => state.userStore);

  const navigate = useNavigate();
  const {changeToShopPage} = useChangePage();
  function openAccountMenu(event: React.MouseEvent<HTMLElement>) {
    setIsAccountMenuOpen(event.currentTarget);
  }
  function openNotification(event: React.MouseEvent<HTMLElement>) {
    setIsAnchorNotification(event.currentTarget);
    setIsNotificationPopperOpen((previousIsNotificationPopperOpen) => !previousIsNotificationPopperOpen);
  }
  function openCart(event: React.MouseEvent<HTMLElement>) {
    setIsAnchorCart(event.currentTarget);
    setIsCartPopperOpen((previousIsCartPopperOpen) => !previousIsCartPopperOpen);
  }
  function closeAccountMenu() {
    setIsAccountMenuOpen(null);
  }

  function moveToShopPage() {
    changeToShopPage();
    navigate("/home");
  }

  function logOut() {
    closeAccountMenu();
    navigate("/");
  }

  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"} alignItems="center">
        <Grid
          onClick={moveToShopPage}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          sx={{visibility: pageType !== "product-detail" ? "hidden" : "visible", cursor: "pointer"}}>
          <ArrowBackIcon />
          <Typography>Back</Typography>
        </Grid>
        <Grid display="flex" justifyContent={pageType !== "product-detail" ? "flex-end" : "center"} alignItems="center" gap={2}>
          {pageType === "task" && (
            <Button onClick={changeToShopPage} sx={LayoutStyles.actionButtonNoHover}>
              <StorefrontOutlinedIcon fontSize="small" sx={{mr: 1}} />
              Shop Now
            </Button>
          )}
          <Tooltip title="Your Cart" placement="bottom">
            <IconButton onClick={openCart}>
              <Badge color="secondary" badgeContent={0} showZero>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications" placement="bottom">
            <IconButton onClick={openNotification}>
              <Badge badgeContent={4} color="secondary">
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Account Menu" placement="bottom">
            <Avatar onClick={openAccountMenu} sx={{ml: 1, cursor: "pointer"}} alt="user avatar" src="" />
          </Tooltip>
        </Grid>
      </Box>
      <Divider sx={{py: 1}} />

      {/* cart popper */}
      <Popper open={Boolean(isCartPopperOpen)} anchorEl={anchorCart}>
        <Box sx={{border: "1px solid #d3d3d3", borderRadius: "10px", p: 1, bgcolor: "#f0f0f0"}}>
          <Box sx={{border: "1px solid #d3d3d3", borderRadius: "10px", p: 1, bgcolor: "white"}}>
            <Grid sx={{width: "300px"}}>
              <Box sx={{p: 1}}>
                <Grid sx={{display: "flex", justifyContent: "flex-end"}}>
                  <CloseOutlinedIcon
                    onClick={() => setIsCartPopperOpen(false)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: "#ed3419",
                      },
                    }}
                  />
                </Grid>
                <Typography sx={{fontSize: 14, fontWeight: "bold", pb: 1}}>Your cart : </Typography>
                <Typography sx={{fontSize: 12, fontWeight: "bold"}}> 1. Nike Solid Waffle Blue</Typography>
                <Grid sx={{display: "flex", justifyContent: "space-between"}}>
                  <Typography sx={{fontSize: 12}}>
                    <strong>Qty:</strong> 1pcs
                  </Typography>
                  <Typography sx={{fontSize: 12}}>
                    <strong>Price: </strong>Rp. 350.000,-
                  </Typography>
                </Grid>
                <Divider sx={{pt: 2}} />
                <Grid sx={{display: "flex", justifyContent: "flex-end", pt: 2}}>
                  <Typography sx={{fontSize: 12}}>
                    <strong>Total Price: </strong>Rp. 350.000,-
                  </Typography>
                </Grid>
                <Box
                  sx={{
                    mt: 1.5,
                  }}>
                  <Button fullWidth sx={LayoutStyles.actionButtonNoHover}>
                    Proceed to Payment
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Popper>

      {/* notification popper */}
      <Popper open={Boolean(isNotificationPopperOpen)} anchorEl={anchorNotification}>
        <Box sx={{border: "1px solid #d3d3d3", borderRadius: "10px", p: 1, bgcolor: "#f0f0f0"}}>
          <Box sx={{border: "1px solid #d3d3d3", borderRadius: "10px", p: 1, bgcolor: "white"}}>
            <Grid sx={{width: "250px"}}>
              <Box sx={{p: 1}}>
                <Grid sx={{display: "flex", justifyContent: "flex-end"}}>
                  <CloseOutlinedIcon
                    onClick={() => setIsNotificationPopperOpen(false)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: "#ed3419",
                      },
                    }}
                  />
                </Grid>
                <Typography sx={{fontSize: 14, fontWeight: "bold", pb: 1}}>Notification</Typography>
                <Divider />
                <Grid sx={{maxHeight: "100px", overflowY: "auto"}}>
                  <Box
                    sx={{
                      pt: 2,
                      pb: 1,
                      cursor: "pointer",
                    }}>
                    <Typography sx={{fontSize: 11, fontWeight: "bold"}}> Your Payment for Order Id : 12331-1233 Success !</Typography>
                    <Grid sx={{display: "flex", justifyContent: "space-between"}}>
                      <Typography sx={{fontSize: 11}}>8 minutes ago</Typography>
                    </Grid>
                    <Divider sx={{mt: 2}} />
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Popper>

      {/* user account menu */}
      <Menu
        anchorEl={isAccountMenuOpen}
        id="account-menu"
        open={Boolean(isAccountMenuOpen)}
        onClose={closeAccountMenu}
        onClick={closeAccountMenu}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{horizontal: "right", vertical: "top"}}
        anchorOrigin={{horizontal: "right", vertical: "bottom"}}>
        <MenuItem onClick={closeAccountMenu}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={closeAccountMenu}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={logOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default Topbar;
