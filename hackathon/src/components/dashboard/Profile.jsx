import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Divider,
  Alert,
  Checkbox
} from '@mui/joy';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../animations';

function Profile() {
  const { user, profile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isFoodSource, setIsFoodSource] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    pincode: '',
    foodSource: {
      sourceType: '',
      sourceName: '',
      sourceLocation: '',
      pincode: ''
    }
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        location: profile.location || '',
        pincode: profile.pincode || '',
        foodSource: profile.foodSource || {
          sourceType: '',
          sourceName: '',
          sourceLocation: '',
          pincode: ''
        }
      });
      setIsFoodSource(!!profile.foodSource);
      setLoading(false);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('foodSource.')) {
      const foodSourceField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        foodSource: {
          ...prev.foodSource,
          [foodSourceField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const updateData = {
        ...formData,
        foodSource: isFoodSource ? formData.foodSource : null
      };

      const response = await updateProfile(updateData);
      if (response.success) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
      } else {
        setError(response.message || 'Failed to update profile');
      }
    } catch (error) {
      setError(error.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <Card variant="outlined" sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
        <CardContent>
          <Typography level="h4" mb={2}>Loading profile...</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      <Card
        variant="outlined"
        sx={{
          maxWidth: 800,
          mx: 'auto',
          my: 4
        }}
      >
        <CardContent>
          <Typography level="h4" startDecorator={<PersonIcon />} mb={2}>
            Profile Information
          </Typography>
          <Divider />

          {error && (
            <Alert color="danger" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert color="success" sx={{ mt: 2 }}>
              {success}
            </Alert>
          )}

          <Stack spacing={2} sx={{ mt: 3 }}>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      endDecorator={<PersonIcon />}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      endDecorator={<EmailIcon />}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      endDecorator={<PhoneIcon />}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Location</FormLabel>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      endDecorator={<LocationOnIcon />}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Pincode</FormLabel>
                    <Input
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <Checkbox
                    label="Are you a Food Source?"
                    checked={isFoodSource}
                    onChange={(e) => setIsFoodSource(e.target.checked)}
                  />

                  {isFoodSource && (
                    <>
                      <FormControl>
                        <FormLabel>Food Source Name</FormLabel>
                        <Input
                          name="foodSource.sourceName"
                          value={formData.foodSource.sourceName}
                          onChange={handleChange}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Food Source Type</FormLabel>
                        <Input
                          name="foodSource.sourceType"
                          value={formData.foodSource.sourceType}
                          onChange={handleChange}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Food Source Location</FormLabel>
                        <Input
                          name="foodSource.sourceLocation"
                          value={formData.foodSource.sourceLocation}
                          onChange={handleChange}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Food Source Pincode</FormLabel>
                        <Input
                          name="foodSource.pincode"
                          value={formData.foodSource.pincode}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </>
                  )}

                  <Stack direction="row" spacing={2}>
                    <Button type="submit" color="primary">
                      Save Changes
                    </Button>
                    <Button
                      variant="soft"
                      color="neutral"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Stack>
              </form>
            ) : (
              <>
                <Typography level="body-lg">
                  <strong>Name:</strong> {profile?.name}
                </Typography>
                <Typography level="body-lg">
                  <strong>Email:</strong> {profile?.email}
                </Typography>
                <Typography level="body-lg">
                  <strong>Phone:</strong> {profile?.phone}
                </Typography>
                <Typography level="body-lg">
                  <strong>Location:</strong> {profile?.location}
                </Typography>
                <Typography level="body-lg">
                  <strong>Pincode:</strong> {profile?.pincode}
                </Typography>

                {profile?.foodSource && (
                  <>
                    <Divider />
                    <Typography level="h5">Food Source Information</Typography>
                    <Typography level="body-lg">
                      <strong>Name:</strong> {profile.foodSource.sourceName}
                    </Typography>
                    <Typography level="body-lg">
                      <strong>Type:</strong> {profile.foodSource.sourceType}
                    </Typography>
                    <Typography level="body-lg">
                      <strong>Location:</strong> {profile.foodSource.sourceLocation}
                    </Typography>
                    <Typography level="body-lg">
                      <strong>Pincode:</strong> {profile.foodSource.pincode}
                    </Typography>
                  </>
                )}

                <Button
                  onClick={() => setIsEditing(true)}
                  sx={{ mt: 2, alignSelf: 'flex-start' }}
                >
                  Edit Profile
                </Button>
              </>
            )}
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default Profile; 