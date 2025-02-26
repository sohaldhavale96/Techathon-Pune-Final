import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOn from "@mui/icons-material/LocationOn";
import BadgeIcon from "@mui/icons-material/Badge";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useState } from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Fooddonation() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    totalCount: 0,
    address: "",
    foodType: "",
    description: "",
    pincode: "",
    expiryTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const boxValues = [10, 15, 8];

  const handleBoxClick = (value) => {
    setFormData((prev) => ({
      ...prev,
      totalCount: prev.totalCount + value,
    }));
  };

  const handleManualChange = (event) => {
    const newValue = parseInt(event.target.value, 10) || 0;
    setFormData((prev) => ({
      ...prev,
      totalCount: newValue,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      foodType: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate required fields
    if (!formData.pincode || !formData.expiryTime) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      console.log('Sending data:', {
        ...formData,
        status: 'Pending',
        donorId: user._id
      });

      const response = await fetch('http://localhost:3000/api/food/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          status: 'Pending',
          donorId: user._id
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('Donation registered successfully!');
        navigate('/dashboard');
      } else {
        throw new Error(data.message || 'Failed to register donation');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to submit donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: "max-content",
        maxWidth: "40%",
        mx: "auto",
      }}
    >
      <Typography level="title-lg" startDecorator={<VolunteerActivismIcon />}>
        Food Donation Form
      </Typography>
      <Divider inset="none" />
      <CardContent
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
          gap: 1.5,
        }}
      >
        <FormControl sx={{ gridColumn: "1/-1" }}>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            endDecorator={<BadgeIcon />}
            required
          />
        </FormControl>

        <FormControl sx={{ gridColumn: "1/-1" }}>
          <FormLabel>Phone</FormLabel>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            endDecorator={<LocalPhoneIcon />}
            pattern="[0-9]{10}"
            required
          />
        </FormControl>

        <FormControl sx={{ gridColumn: "1/-1" }}>
          <FormLabel>Select Food Type</FormLabel>
          <Select
            placeholder="Select Food Type"
            value={formData.foodType}
            onChange={handleSelectChange}
            required
          >
            <Option value="Veg">Veg</Option>
            <Option value="Non-veg">Non-veg</Option>
          </Select>
        </FormControl>

        <Box sx={{ gridColumn: "1/-1" }}>
          <FormLabel>Total people served</FormLabel>
          <Grid container spacing={2}>
            {boxValues.map((value, index) => (
              <Grid item xs={12} sm={4} md={6} key={index}>
                <Button
                  variant="outlined"
                  onClick={() => handleBoxClick(value)}
                  fullWidth
                >
                  {value}
                </Button>
              </Grid>
            ))}
            <Grid item xs={12} sm={4} md={3}>
              <Input
                placeholder="total count"
                sx={{ width: `100%` }}
                onChange={handleManualChange}
                value={formData.totalCount}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6">
                Total Served: {formData.totalCount}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <FormControl sx={{ gridColumn: "1/-1" }}>
          <FormLabel>Description</FormLabel>
          <Input
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            sx={{ width: `100%` }}
          />
        </FormControl>

        <FormControl sx={{ gridColumn: "1/-1" }}>
          <FormLabel>Location</FormLabel>
          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Your location"
            startDecorator={
              <Button
                variant="soft"
                color="neutral"
                startDecorator={<LocationOn />}
              >
                Locate
              </Button>
            }
            sx={{ width: `100%` }}
            required
          />
        </FormControl>

        <FormControl sx={{ gridColumn: "1/-1" }}>
          <FormLabel>Pin Code *</FormLabel>
          <Input
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Enter your pincode"
            type="text"
            pattern="[0-9]{6}"
            required
            error={!formData.pincode}
          />
        </FormControl>

        <FormControl sx={{ gridColumn: "1/-1" }}>
          <FormLabel>Expiry Time *</FormLabel>
          <Input
            name="expiryTime"
            value={formData.expiryTime}
            onChange={handleChange}
            type="time"
            required
            error={!formData.expiryTime}
          />
        </FormControl>

        <CardActions sx={{ gridColumn: "1/-1" }}>
          {error && <div className="error-message">{error}</div>}
          <Button 
            variant="solid" 
            color="primary" 
            onClick={handleSubmit} 
            disabled={loading}
            fullWidth
          >
            {loading ? 'Submitting...' : 'I agreed all the terms and conditions and ready to donate'}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default Fooddonation;