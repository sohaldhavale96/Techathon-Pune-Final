import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import LoginIcon from "@mui/icons-material/Login";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import Link from "@mui/joy/Link";
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { scaleIn } from '../../animations';
import Alert from "@mui/joy/Alert";
import Box from "@mui/joy/Box";

function UserLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch("http://localhost:3000/api/donor/login", {
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

      if (data.success) {
        login(data);
        navigate('/');
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={scaleIn}
      initial="initial"
      animate="animate"
    >
      <Card
        variant="outlined"
        sx={{
          maxHeight: "max-content",
          maxWidth: "40%",
          mx: "auto",
          mt: 4
        }}
      >
        <Typography level="title-lg" startDecorator={<LoginIcon />}>
          User Login
        </Typography>
        <Divider inset="none" />
        <CardContent>
          {error && (
            <Alert color="danger" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ mb: 2 }}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                endDecorator={<EmailIcon />}
                required
              />
            </FormControl>

            <FormControl sx={{ mb: 2 }}>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                endDecorator={<PasswordIcon />}
                required
              />
            </FormControl>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href="/signup">Don't have an account? Sign up</Link>
              <Button 
                type="submit" 
                loading={loading}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default UserLogin; 