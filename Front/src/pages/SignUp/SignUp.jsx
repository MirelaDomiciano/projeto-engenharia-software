import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Select, MenuItem, InputLabel, FormHelperText } from "@mui/material";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "", 
    email: "",
    password: "",
    address: "",
    type: "", 
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const userTypes = [
    { value: 0, label: "Buyer", description: "Sign up to buy products" },
    { value: 1, label: "Seller", description: "Sign up to sell products" },
    { value: 2, label: "Deliverer", description: "Sign up to make deliveries" }
  ];

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

    if (formData.type === "") {
      setError("Please select a user type");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/signUp", formData);
      if (response.status === 201) { 
        setSuccess("User created successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred during registration."
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
          width: { xs: "90%", sm: "60%", md: "40%", lg: "30%" },
          maxWidth: "500px",
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

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ 
            width: "100%",
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <TextField
            name="name"
            variant="outlined"
            required
            fullWidth
            label="Full Name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />

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

          <TextField
            variant="outlined"
            required
            fullWidth
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
          />

          <FormControl fullWidth required>
            <InputLabel>User Type</InputLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              label="User Type"
            >
              {userTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {formData.type !== "" && 
                userTypes.find(t => t.value === formData.type)?.description}
            </FormHelperText>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 1, py: 1.5 }}
          >
            Sign Up
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Link href="/" variant="body2">
              Already have an account? Sign in
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUp;