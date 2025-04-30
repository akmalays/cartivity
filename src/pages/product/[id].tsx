import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Grid, Rating, TextField, Typography } from '@mui/material';

import { RootState } from '../../app/store';
import ShkraImages from '../../assets/images/shoes/shkra/shkra_detail.webp';
import DefaultLayout from '../../components/layouts/DefaultLayout';
import { LayoutStyles } from '../../components/layouts/LayoutStyles';
import Topbar from '../../components/layouts/Topbar';
import Loading from '../../components/loading/loading';
import { setIsPageDetailLoading } from '../../store/shop/shopStore';
import { setUserPageType } from '../../store/user/userStore';

function ProductDetail() {
  const dispatch = useDispatch();
  const {isPageDetailLoading} = useSelector((state: RootState) => state.shopStore);

  useEffect(() => {
    dispatch(setUserPageType({pageType: "product-detail"}));
    dispatch(setIsPageDetailLoading({isPageDetailLoading: true}));
    setTimeout(() => {
      dispatch(setIsPageDetailLoading({isPageDetailLoading: false}));
    }, 2000);
  }, []);

  return (
    <div>
      <DefaultLayout>
        <div>
          <Topbar />
          {isPageDetailLoading ? (
            <Loading />
          ) : (
            <Box sx={{pt: 4}}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {xs: "column", md: "row"},
                  gap: 2,
                  alignItems: "flex-start",
                }}>
                <Box
                  sx={{
                    border: "1px solid #d3d3d3",
                    borderRadius: "20px",
                    px: 4,
                    py: 4,
                    mx: {xs: 0, md: 4},
                    height: {xs: 270, md: 540},
                    width: {xs: "100%", md: 400},
                    maxWidth: 400,
                    boxSizing: "border-box",
                    backgroundColor: "white",
                    flexShrink: 0,
                  }}>
                  <img
                    src={ShkraImages}
                    alt="ortus"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    width: {xs: "100%", md: "auto"},
                  }}>
                  <Typography sx={{textAlign: "left", fontSize: 13, color: "grey"}}>shoes \ mens running</Typography>
                  <Typography sx={{textAlign: "left", fontSize: 32, mt: "-5px"}}>Ortus Shakra v1233</Typography>

                  <Box sx={{display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap"}}>
                    <Box sx={{display: "flex", gap: 1, alignItems: "center"}}>
                      <Typography sx={{textAlign: "left", textDecoration: "line-through", fontSize: 13}}>Rp 1.000.000,-</Typography>
                      <Typography sx={{textAlign: "left", fontSize: 28, fontWeight: "bold"}}>Rp 1.000.000,-</Typography>
                    </Box>
                    <Typography
                      sx={{
                        backgroundColor: "#ff5722",
                        borderRadius: "5px",
                        py: 0.5,
                        px: 1,
                        fontSize: 11,
                        fontWeight: "bold",
                        color: "white",
                      }}>
                      Special Price
                    </Typography>
                  </Box>

                  <Box sx={{display: "flex", gap: 2, alignItems: "center"}}>
                    <Rating name="half-rating-read" size={"small"} value={4.5} precision={0.5} readOnly />
                    <Typography sx={{textAlign: "left", fontSize: 13}}>(4,5) 1,2k Reviews</Typography>
                  </Box>

                  <Box sx={{mb: 1, mt: 2}}>
                    <Typography sx={{textAlign: "left", fontSize: 14, fontWeight: "bold", mb: 1}}>Descriptions</Typography>
                    <Typography sx={{textAlign: "left", fontSize: 12}}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sequi nihil consectetur vel eum fuga accusamus dolore ratione ducimus voluptatibus temporibus
                      quisquam id, provident nisi magni architecto ut veritatis.
                    </Typography>
                  </Box>

                  <Box sx={{my: 1}}>
                    <Typography sx={{textAlign: "left", fontSize: 14, fontWeight: "bold"}}>Available Color</Typography>
                    <Box sx={{display: "flex", gap: 2, flexWrap: "wrap", pt: 1}}>
                      {[
                        {color: "#9e9e9e", borderColor: "#9e9e9e"},
                        {color: "#a5d6a7", borderColor: "#a5d6a7"},
                        {color: "#ffffff", borderColor: "#e0e0e0"},
                      ].map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            width: 35,
                            height: 35,
                            borderRadius: "4px",
                            border: "2px solid transparent",
                            p: 0.25,
                            bgcolor: "#f5f5f5",
                            cursor: "pointer",
                            "&:hover": {
                              borderColor: item.borderColor,
                            },
                          }}>
                          <Box
                            sx={{
                              width: "100%",
                              height: "100%",
                              bgcolor: item.color,
                              borderRadius: "2px",
                              ...(item.color === "#f0f0f0" && {border: "1px solid #e0e0e0"}),
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{my: 1}}>
                    <Typography sx={{textAlign: "left", fontSize: 14, fontWeight: "bold", mb: 1}}>Size</Typography>
                    <Box sx={{display: "flex", gap: 2, flexWrap: "wrap"}}>
                      {["S", "M", "L", "XL"].map((size) => (
                        <Box
                          key={size}
                          sx={{
                            width: 35,
                            height: 35,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "4px",
                            fontSize: 12,
                            border: "1px solid #d3d3d3",
                            backgroundColor: "white",
                            color: "black",
                            fontWeight: "900",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              backgroundColor: "black",
                              color: "white",
                              borderColor: "black",
                            },
                          }}>
                          {size}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      my: 1,
                    }}>
                    <Typography sx={{textAlign: "left", fontSize: 14, fontWeight: "bold"}}>Quantity </Typography>
                    <Grid sx={{display: "flex", gap: 1.5, alignItems: "center", pt: 1.5}}>
                      <TextField
                        size="small"
                        type="text"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            height: 35,
                            width: 50,
                            fontSize: "14px",
                            padding: "8px !important",
                            "& input": {
                              padding: "2px",
                              fontWeight: "bold",
                            },
                          },
                        }}
                      />
                      <Typography sx={{textAlign: "left", fontSize: 14, fontWeight: "bold"}}>pcs</Typography>
                    </Grid>
                  </Box>
                  <Box
                    sx={{
                      mt: 1.5,
                    }}>
                    <Button fullWidth sx={LayoutStyles.actionButtonNoHover}>
                      Add to Cart
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </div>
      </DefaultLayout>
    </div>
  );
}

export default ProductDetail;
