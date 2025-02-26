import { useState, useEffect } from 'react';
import { Box, Card, Typography, Chip, Alert, Table, Select, Option } from '@mui/joy';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

function NGODashboard() {
  const [ngoData, setNgoData] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchNGOStatus();
    fetchNearbyDonations();
  }, []);

  const fetchNGOStatus = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/receiver/me', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setNgoData(data.data.receiver);
      }
    } catch (error) {
      console.error('Error fetching NGO status:', error);
      setError("Failed to fetch NGO status");
    }
  };

  const fetchNearbyDonations = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/receiver/nearby-donations', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setDonations(data.data);
      }
    } catch (error) {
      console.error('Error fetching donations:', error);
      setError("Failed to fetch nearby donations");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (donationId, newValue) => {
    if (!newValue) return;
    
    setUpdating(true);
    try {
      const response = await fetch(`http://localhost:3000/api/receiver/food-status/${donationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newValue })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setDonations(prevDonations => 
          prevDonations.map(donation => 
            donation._id === donationId 
              ? { ...donation, status: newValue }
              : donation
          )
        );
        alert('Status updated successfully');
      } else {
        throw new Error(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert(error.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ p: 3 }}>
        {/* NGO Status Card */}
        <Card variant="outlined" sx={{ mb: 3 }}>
          <Typography level="h4">NGO Dashboard</Typography>
          <Typography level="body-md">Welcome, {ngoData?.name}</Typography>
          <Chip
            color={ngoData?.verificationStatus?.status === 'Verified' ? 'success' : 'warning'}
            variant="soft"
          >
            {ngoData?.verificationStatus?.status || 'Status Unknown'}
          </Chip>
        </Card>

        {/* Nearby Donations */}
        <Card variant="outlined">
          <Typography level="h5" sx={{ mb: 2 }}>Nearby Food Donations</Typography>
          {error && <Alert color="danger" sx={{ mb: 2 }}>{error}</Alert>}
          
          <Table>
            <thead>
              <tr>
                <th>Donor Name</th>
                <th>Food Type</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation._id}>
                  <td>{donation.name}</td>
                  <td>{donation.foodType}</td>
                  <td>{donation.totalCount}</td>
                  <td>{donation.address}</td>
                  <td>{donation.phone}</td>
                  <td>
                    <Chip
                      variant="soft"
                      color={
                        donation.status === 'Pending' ? 'neutral' :
                        donation.status === 'Accepted' ? 'primary' :
                        donation.status === 'Completed' ? 'success' :
                        'danger'
                      }
                    >
                      {donation.status}
                    </Chip>
                  </td>
                  <td>
                    <Select
                      value={donation.status}
                      onChange={(_, newValue) => handleStatusUpdate(donation._id, newValue)}
                      size="sm"
                      variant="outlined"
                      disabled={updating || (donation.status !== 'Pending' && donation.status !== donation.status)}
                      sx={{ minWidth: 120 }}
                    >
                      <Option value="Pending">Pending</Option>
                      <Option value="Accepted">Accept</Option>
                      <Option value="Completed">Complete</Option>
                      <Option value="Cancelled">Cancel</Option>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Box>
    </motion.div>
  );
}

export default NGODashboard; 