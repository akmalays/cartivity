import { Box } from '@mui/material';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({children}: DefaultLayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        p: 2,
        overflowY: "hidden",
      }}>
      <Box
        sx={{
          border: "1px solid #d3d3d3",
          borderRadius: "20px",
          px: 4,
          py: 4,
          mx: 4,
          height: {xs: "auto", sm: "auto", md: 700},
          maxWidth: 1000,
          width: "100%",
          boxSizing: "border-box",
          backgroundColor: "white",
        }}>
        {children}
      </Box>
    </Box>
  );
}

export default DefaultLayout;
