import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOn from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PinDropIcon from "@mui/icons-material/PinDrop";
import SubjectIcon from "@mui/icons-material/Subject";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Link from "@mui/joy/Link";
import Box from "@mui/joy/Box";
import Image from "../../assets/contactus/pexels-joaojesusdesign-28493060.jpg";
import Alert from '@mui/joy/Alert';
import { motion } from 'framer-motion';
import "./contactus.css";
import ContactMailIcon from '@mui/icons-material/ContactMail';

function Contactus() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    message: '',
    type: ''
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 20, 
      opacity: 0 
    },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:3000/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          message: data.message,
          type: 'success'
        });
        // Clear form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      setStatus({
        message: error.message || 'Failed to send message. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      minHeight: "calc(100vh - 64px)", // Adjust for navbar height
      marginBottom: "2rem" // Add space for footer
    }}>
      <div style={{ display: "flex", flex: "1" }}>
        {/* Left Side - Contact Information */}
        <div
          style={{
            flex: "1",
            backgroundColor: "#f0f0f0",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Typography level="h1" textColor="white" sx={{ fontWeight: "bold", mb: 2 }}>
              Contact Information
            </Typography>
            <Typography level="body1" textColor="white" sx={{ fontWeight: "bold" }}>
              Feel free to reach out to us with any questions or concerns.
            </Typography>
          </div>

          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "2rem",
            color: "white" 
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <LocationOn />
              <Typography textColor="white">Ichalkaranji, 416-115, Maharashtra</Typography>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <EmailIcon />
              <Typography textColor="white">mealconnect@gmail.com</Typography>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <LocalPhoneIcon />
              <Typography textColor="white">+91 9087654321</Typography>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div
          className="scroll-form"
          style={{
            flex: "1",
            overflowY: "auto",
            padding: "20px",
            backgroundColor: "#ffffff",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              variant="outlined"
              sx={{
                maxWidth: "80%",
                mx: "auto",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={itemVariants}>
                  <Typography 
                    level="h4" 
                    sx={{ 
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <ContactMailIcon />
                    Contact Us
                  </Typography>
                </motion.div>

                <motion.div variants={itemVariants}>
                  {status.message && (
                    <Alert
                      color={status.type === 'success' ? 'success' : 'danger'}
                      sx={{ gridColumn: "1/-1", mb: 2 }}
                      onClose={() => setStatus({ message: '', type: '' })}
                    >
                      {status.message}
                    </Alert>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormControl sx={{ gridColumn: "1/-1" }}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      startDecorator={<AccountCircleIcon />}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormControl sx={{ gridColumn: "1/-1" }}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      startDecorator={<EmailIcon />}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormControl sx={{ gridColumn: "1/-1" }}>
                    <FormLabel>Subject</FormLabel>
                    <Input
                      startDecorator={<SubjectIcon />}
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormControl sx={{ gridColumn: "1/-1" }}>
                    <FormLabel>Message</FormLabel>
                    <TextField
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </FormControl>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Box sx={{ gridColumn: "1/-1", mt: 2 }}>
                    Want to be a donor?{" "}
                    <Link href="/register" fontWeight="lg">
                      Register here
                    </Link>
                  </Box>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <CardActions sx={{ gridColumn: "1/-1", justifyContent: "flex-end" }}>
                    <Button 
                      variant="solid" 
                      color="primary" 
                      onClick={handleSubmit}
                      size="lg"
                    >
                      Send Message
                    </Button>
                  </CardActions>
                </motion.div>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div
        style={{
          padding: "30px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div className="contact-card">
          <Typography level="h3" startDecorator={<LocationOn />}>
            Address
          </Typography>
          <Typography level="body2">Ichalkaranji, 416-115, Maharashtra</Typography>
        </div>
        <div className="contact-card">
          <Typography level="h3" startDecorator={<AccountCircleIcon />}>
            Company
          </Typography>
          <Typography level="body2">MealConnect</Typography>
        </div>
        <div className="contact-card">
          <Typography level="h3" startDecorator={<EmailIcon />}>
            Email
          </Typography>
          <Typography level="body2">mealconnect@gmail.com</Typography>
        </div>
        <div className="contact-card">
          <Typography level="h3" startDecorator={<LocalPhoneIcon />}>
            Phone
          </Typography>
          <Typography level="body2">+91 9087654321</Typography>
        </div>
      </div>
    </div>
  );
}

export default Contactus;