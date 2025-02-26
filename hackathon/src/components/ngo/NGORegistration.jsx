import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Stack,
  Alert,
  Modal,
  ModalDialog
} from '@mui/joy';
import VerifiedIcon from '@mui/icons-material/Verified';
import { motion } from 'framer-motion';
import { scaleIn } from '../../animations';

function NGORegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ngoDarpanID: '',
    location: '',
    description: '',
    pincode: '',
    leader: {
      name: '',
      phone: '',
      email: ''
    },
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('leader.')) {
      const leaderField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        leader: {
          ...prev.leader,
          [leaderField]: value
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
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/receiver/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        navigate('/ngo/dashboard');
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message);
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
          maxWidth: 600,
          mx: 'auto',
          my: 4
        }}
      >
        <CardContent>
          <Typography
            level="h4"
            startDecorator={<VerifiedIcon />}
            sx={{ mb: 3 }}
          >
            NGO Registration
          </Typography>

          {error && (
            <Alert color="danger" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl required>
                <FormLabel>NGO Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl required>
                <FormLabel>NGO Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl required>
                <FormLabel>NGO Darpan ID</FormLabel>
                <Input
                  name="ngoDarpanID"
                  value={formData.ngoDarpanID}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl required>
                <FormLabel>Location</FormLabel>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl required>
                <FormLabel>Pincode</FormLabel>
                <Input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  type="number"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  minRows={3}
                />
              </FormControl>

              <Typography level="h6" sx={{ mt: 2 }}>
                Leader Information
              </Typography>

              <FormControl required>
                <FormLabel>Leader Name</FormLabel>
                <Input
                  name="leader.name"
                  value={formData.leader.name}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl required>
                <FormLabel>Leader Phone</FormLabel>
                <Input
                  name="leader.phone"
                  value={formData.leader.phone}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl required>
                <FormLabel>Leader Email</FormLabel>
                <Input
                  type="email"
                  name="leader.email"
                  value={formData.leader.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl required>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </FormControl>

              <Button
                type="submit"
                loading={loading}
                loadingPosition="start"
                sx={{ mt: 2 }}
              >
                Register NGO
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>

      <Modal
        open={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate('/');
        }}
      >
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography
            id="alert-dialog-modal-title"
            level="h2"
            startDecorator={<VerifiedIcon />}
          >
            Registration Submitted
          </Typography>
          <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
            Your NGO registration has been submitted successfully. Our team will review your application and verify your NGO credentials.
            Please wait for the verification process to complete before logging in.
            You can check your verification status by attempting to login.
          </Typography>
          <Button
            variant="solid"
            color="primary"
            onClick={() => {
              setShowSuccessModal(false);
              navigate('/');
            }}
          >
            Return to Home
          </Button>
        </ModalDialog>
      </Modal>
    </motion.div>
  );
}

export default NGORegistration; 