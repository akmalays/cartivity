import { useNavigate } from 'react-router-dom';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Grid, Tooltip, Typography } from '@mui/material';

import ShkraImages from '../../assets/images/shoes/shkra/shkra_banner.webp';

function Products() {
  const navigate = useNavigate();
  const id = "2233222";
  function redirectToPageDetail() {
    navigate(`/product/${id}`);
  }

  return (
    <div>
      <Grid container display="flex" justifyContent="flex-start" alignItems={"center"} gap={4} sx={{my: 3, maxHeight: 300, overflowY: "auto"}}>
        <Grid sx={{border: "solid 1px #e5e7eb", backgroundColor: "#f0f0f0", borderRadius: "10px", height: 300, width: 200}}>
          <Grid display="flex" alignContent="center" justifyContent={"center"} container>
            <Grid sx={{position: "relative", border: "solid 1px #e5e7eb", width: 170, height: 170, mt: 2, overflow: "hidden"}}>
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  backgroundColor: "#ff5722",
                  color: "white",
                  padding: "4px 4px",
                  fontSize: "11px",
                  fontWeight: "bold",
                  borderTopRightRadius: "4px",
                  borderBottomRightRadius: "4px",
                  textAlign: "center",
                  zIndex: 1,
                }}>
                SPECIAL PRICE
              </Box>
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
            </Grid>
            <Typography sx={{fontSize: 11, fontWeight: "light", pt: 1, color: "#6b7280"}}>Mens Special Price Shoes</Typography>
          </Grid>
          <Grid container sx={{px: 2}}>
            <Typography
              onClick={redirectToPageDetail}
              fontWeight={"bold"}
              fontSize={"small"}
              sx={{
                color: "#111827",
                "&:hover": {
                  textDecoration: "underline",
                  cursor: "pointer",
                },
              }}>
              Ortuseight Shakra Men V23221
            </Typography>
            <Grid sx={{display: "flex", justifyContent: "space-between", alignItems: "center", pt: 0.5, width: "100%"}}>
              <Typography sx={{color: "#ff5722"}} fontSize={19} fontWeight="bold">
                Rp.800.000, -
              </Typography>
              <Tooltip title="add to cart" placement="bottom">
                <ShoppingCartIcon sx={{color: "#111827", cursor: "pointer", backgroundColor: "white", p: 0.8, borderRadius: "20px"}} fontSize="small" />
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <Grid display="flex" justifyContent={"center"} sx={{border: "solid 1px #d3d3d3", borderRadius: "10px", height: 300, width: 200}}>
          <Grid sx={{border: "solid 1px #d3d3d3", width: 170, height: 170, mt: 2}}></Grid>
        </Grid>
        <Grid display="flex" justifyContent={"center"} sx={{border: "solid 1px #d3d3d3", borderRadius: "10px", height: 300, width: 200}}>
          <Grid sx={{border: "solid 1px #d3d3d3", width: 170, height: 170, mt: 2}}></Grid>
        </Grid>
        <Grid display="flex" justifyContent={"center"} sx={{border: "solid 1px #d3d3d3", borderRadius: "10px", height: 300, width: 200}}>
          <Grid sx={{border: "solid 1px #d3d3d3", width: 170, height: 170, mt: 2}}></Grid>
        </Grid>
        <Grid display="flex" justifyContent={"center"} sx={{border: "solid 1px #d3d3d3", borderRadius: "10px", height: 300, width: 200}}>
          <Grid sx={{border: "solid 1px #d3d3d3", width: 170, height: 170, mt: 2}}></Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Products;
