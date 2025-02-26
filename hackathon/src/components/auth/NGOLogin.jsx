import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Button, Input, Typography, FormControl, FormLabel, Alert } from '@mui/joy';
import { motion } from 'framer-motion';
import BusinessIcon from '@mui/icons-material/Business';
import { useAuth } from '../../context/AuthContext';

const NGOLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:3000/api/receiver/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password.trim()
        })
      });

      const data = await response.json();
      console.log('Response:', data); // Debug log

      if (response.ok && data.success) {
        login(data);
        navigate('/ngo/dashboard');
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card
        variant="outlined"
        sx={{
          maxWidth: 400,
          mx: 'auto',
          mt: 4
        }}
      >
        <CardContent>
          <Typography
            level="h4"
            startDecorator={<BusinessIcon />}
            sx={{ mb: 3 }}
          >
            NGO Login
          </Typography>

          {error && (
            <Alert color="danger" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <FormControl sx={{ mb: 2 }}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </FormControl>

            <FormControl sx={{ mb: 3 }}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </FormControl>

            <Button 
              type="submit" 
              fullWidth 
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NGOLogin; 