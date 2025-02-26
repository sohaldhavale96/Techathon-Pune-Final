import { useState, useEffect } from 'react';
import { Box, Card, Typography, Button, Chip, Table } from '@mui/joy';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const AdminDashboard = () => {
  const [pendingNGOs, setPendingNGOs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingNGOs();
  }, []);

  const fetchPendingNGOs = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/admin/pending-verifications', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setPendingNGOs(data.data);
      }
    } catch (error) {
      console.error('Error fetching NGOs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (ngoId, status) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/verify-ngo/${ngoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({
          status,
          message: status === 'Verified' ? 
            'Your NGO has been verified successfully' : 
            'Your NGO registration was not approved'
        })
      });

      const data = await response.json();
      if (data.success) {
        fetchPendingNGOs(); // Refresh the list
        alert(`NGO ${status.toLowerCase()} successfully`);
      }
    } catch (error) {
      console.error('Error updating NGO:', error);
      alert('Error updating NGO status');
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box sx={{ p: 3 }}>
        <Typography level="h3" sx={{ mb: 3 }}>
          NGO Verification Requests
        </Typography>

        <Card variant="outlined">
          <Table>
            <thead>
              <tr>
                <th>NGO Name</th>
                <th>Registration ID</th>
                <th>Location</th>
                <th>Contact Person</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingNGOs.map((ngo) => (
                <tr key={ngo._id}>
                  <td>{ngo.name}</td>
                  <td>{ngo.ngoDarpanID}</td>
                  <td>{ngo.location}</td>
                  <td>
                    {ngo.leader.name}<br />
                    <Typography level="body-sm">{ngo.leader.email}</Typography>
                  </td>
                  <td>
                    <Chip
                      color={ngo.verificationStatus.status === 'Pending' ? 'warning' : 'success'}
                    >
                      {ngo.verificationStatus.status}
                    </Chip>
                  </td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="sm"
                        color="success"
                        startDecorator={<CheckCircleIcon />}
                        onClick={() => handleVerification(ngo._id, 'Verified')}
                      >
                        Verify
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        startDecorator={<CancelIcon />}
                        onClick={() => handleVerification(ngo._id, 'Rejected')}
                      >
                        Reject
                      </Button>
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Box>
    </motion.div>
  );
};

export default AdminDashboard; 