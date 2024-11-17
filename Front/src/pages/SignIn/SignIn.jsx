import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";

const SignIn = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "20%",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <LockOutlinedIcon fontSize="large" color="primary" />
          <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
            Sign In
          </Typography>
        </Box>
        <FormControl noValidate sx={{ width: "100%" }}>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid2>
          </Grid2>
          <Link href="home" variant="body2" underline="none">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"z
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Sign In
            </Button>
          </Link>
          <Grid2 container justifyContent="flex-end">
            <Grid2>
              <Link href="cadastro" variant="body2">
                Don't have an account? Sign up
              </Link>
            </Grid2>
          </Grid2>
        </FormControl>
      </Paper>
      <Box mt={5}></Box>
    </Box>
  );
};

export default SignIn;
