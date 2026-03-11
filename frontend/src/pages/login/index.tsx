import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    EmailOutlined, LockOutlined, ShoppingCartOutlined, TaskOutlined, Visibility, VisibilityOff
} from '@mui/icons-material';
import {
    Box, Button, Checkbox, CircularProgress, FormControlLabel, IconButton, InputAdornment, Link,
    TextField, Typography
} from '@mui/material';

import CartivityLogo from '../../assets/images/shoes/cartivity_full.png';
import { LayoutStyles } from '../../components/layouts/LayoutStyles';

function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState<string>("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setErrorEmailMessage("Email harus diisi");
      return;
    }
    if (!password.trim()) {
      setErrorPasswordMessage("Password harus diisi");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorEmailMessage("Format email tidak valid");
      return;
    }
    setErrorEmailMessage("");
    setErrorPasswordMessage("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/home");
    }, 2000);
  }
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "white",
      }}>
      <Box
        sx={{
          width: {xs: "0", md: "50%"},
          display: {xs: "none", md: "flex"},
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f5f5f5",
          p: 4,
          gap: 4,
        }}>
        <Box sx={{textAlign: "center"}}>
          <img src={CartivityLogo} alt="Cartivity Logo" style={{width: 270, height: 200}} />
        </Box>

        <Box sx={{display: "flex", gap: 3, mb: 4}}>
          <Box sx={{textAlign: "center", maxWidth: 200}}>
            <TaskOutlined sx={{fontSize: 50, mb: 1, color: "black"}} />
            <Typography variant="h6" sx={{fontWeight: "bold"}}>
              Task Manager
            </Typography>
            <Typography variant="body2" sx={{color: "black"}}>
              Organize your daily tasks and boost productivity
            </Typography>
          </Box>

          <Box sx={{textAlign: "center", maxWidth: 200}}>
            <ShoppingCartOutlined sx={{fontSize: 50, mb: 1, color: "black"}} />
            <Typography variant="h6" sx={{fontWeight: "bold"}}>
              Online Shop
            </Typography>
            <Typography variant="body2" sx={{color: "black"}}>
              Shop essentials without leaving your workspace
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: {xs: "100%", md: "50%"},
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
        component="form">
        <Box sx={{width: "100%", maxWidth: 400}}>
          <Typography variant="h5" sx={{fontWeight: "bold"}}>
            Welcome Back,
          </Typography>
          <Typography variant="body1" sx={{mb: 4, color: "text.secondary"}}>
            Sign in to manage your tasks and explore our shop
          </Typography>

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined fontSize="small" />
                </InputAdornment>
              ),
            }}
            required
            error={errorEmailMessage !== ""}
            helperText={errorEmailMessage}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
            error={errorPasswordMessage !== ""}
            helperText={errorPasswordMessage}
          />

          <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", my: 2}}>
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} color="default" />}
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 14,
                },
                "& .MuiSvgIcon-root": {
                  fontSize: 24,
                },
              }}
              label="Remember me"
            />
            <Link href="#" variant="body2" sx={{textDecoration: "none"}}>
              Forgot password?
            </Link>
          </Box>

          <Box sx={{mt: 2}}>
            <Button onClick={handleSubmit} fullWidth size="large" type="submit" sx={{...LayoutStyles.actionButtonNoHover, mt: 2, fontWeight: "bold", height: "50px", fontSize: 14}}>
              {isLoading ? <CircularProgress size="30px" style={{color: "#ffffff"}} /> : <Typography>Sign In </Typography>}
            </Button>
          </Box>

          <Typography variant="body2" sx={{mt: 3, textAlign: "center"}}>
            Don't have an account?{" "}
            <Link href="/register" fontWeight="bold" sx={{textDecoration: "none"}}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
