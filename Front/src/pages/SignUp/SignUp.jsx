import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "", 
    email: "",
    password: "",
    address: "",
    type: 0, 
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:8081/signUp", formData);

      if (response.status === 201) { 
        setSuccess("Usuário criado  com sucesso");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Ocorreu um erro ao cadastrar."
      );
    }
  };

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
            Sign Up
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
            {success}
          </Alert>
        )}

        <FormControl component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <Grid2 container rowSpacing={2} width={'100%'}>
            <Grid2 size={12} >
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                label="Name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid2>
          </Grid2>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            Sign Up
          </Button>
          <Grid2 container justifyContent="flex-end">
            <Grid2 item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid2>
          </Grid2>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default SignUp;