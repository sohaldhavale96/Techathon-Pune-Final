import { useEffect, useState } from 'react';
import axios from 'axios';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import Sidebardashboard from '../components/dashboard/Sidebardashboard';
import Profile from '../components/dashboard/Profile';
import BarChartDashboard from '../components/charts/BarChartDashboard';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import { useAuth } from '../context/AuthContext';
import DonationRequests from '../components/dashboard/DonationRequests';
import { motion } from 'framer-motion';
import { pageAnimation, slideIn, fadeInUp } from '../animations';

function Dashboard() {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [donationToCancel, setDonationToCancel] = useState(null);

  const isVerifiedNGO = profile?.verificationStatus?.status === 'Verified';

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/food/user-donations', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        if (data.success) {
          setDonations(data.data);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        setError('Failed to fetch donations');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDonations();
    }
  }, [user]);

  // Filter donations based on status
  const activedonations = donations.filter(donation => donation.status === 'Pending');
  const historyDonations = donations.filter(donation => donation.status !== 'Pending');

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/food/update-status/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();
      if (data.success) {
        setDonations(donations.map(donation =>
          donation._id === id ? { ...donation, status: newStatus } : donation
        ));
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      alert('Failed to update status');
      console.error('Error:', err);
    }
  };

  const DonationTable = ({ donations, showActions = false }) => (
    <Table>
      <thead>
        <tr>
          <th>Sr.No.</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Date</th>
          <th>Total Count</th>
          <th>Status</th>
          {showActions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {donations.map((donation, index) => (
          <tr key={donation._id}>
            <td>{index + 1}</td>
            <td>{donation.name}</td>
            <td>{donation.phone}</td>
            <td>{new Date(donation.date).toLocaleDateString()}</td>
            <td>{donation.totalCount}</td>
            <td><Chip {...getStatusChipProps(donation.status)} size="sm">{donation.status}</Chip></td>
            {showActions && (
              <td>
                {donation.status === 'Pending' && (
                  <Button 
                    color="danger" 
                    size="sm" 
                    variant="soft" 
                    onClick={() => handleCancelConfirmation(donation)}
                  >
                    Cancel
                  </Button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
      case 'donations':
        return isVerifiedNGO ? <DonationRequests /> : (
          <Typography level="h5" color="warning">
            Please wait for NGO verification to access donations
          </Typography>
        );
      case 'analytics':
        return (
          <Sheet sx={{ padding: '20px' }}>
            <Typography level="h4" sx={{ mb: 2 }}>Analytics</Typography>
            <div className="barchart">
              <BarChartDashboard />
            </div>
          </Sheet>
        );
        
      case 'inaction':
        return (
          <Sheet sx={{ padding: '20px' }}>
            <Typography level="h4" sx={{ mb: 2 }}>In Action</Typography>
            {activedonations.length > 0 ? (
              <DonationTable donations={activedonations} showActions={true} />
            ) : (
              <Typography level="body-lg" sx={{ textAlign: 'center', mt: 4 }}>
                No active donations found
              </Typography>
            )}
          </Sheet>
        );
        
      case 'history':
        return (
          <Sheet sx={{ padding: '20px' }}>
            <Typography level="h4" sx={{ mb: 2 }}>Donation History</Typography>
            {historyDonations.length > 0 ? (
              <DonationTable donations={historyDonations} showActions={false} />
            ) : (
              <Typography level="body-lg" sx={{ textAlign: 'center', mt: 4 }}>
                No donation history found
              </Typography>
            )}
          </Sheet>
        );
        
      default:
        return <Profile />;
    }
  };

  const getStatusChipProps = (status) => {
    switch (status) {
      case 'Pending':
        return { color: 'warning', variant: 'soft' };
      case 'Accepted':
        return { color: 'success', variant: 'soft' };
      case 'Completed':
        return { color: 'success', variant: 'solid' };
      case 'Cancelled':
        return { color: 'danger', variant: 'soft' };
      default:
        return { color: 'neutral', variant: 'soft' };
    }
  };

  const handleCancelConfirmation = (donation) => {
    setDonationToCancel(donation);
    setCancelModalOpen(true);
  };

  const handleCancel = async () => {
    setCancelModalOpen(false);
    if (donationToCancel) {
      await handleStatusUpdate(donationToCancel._id, 'Cancelled');
      setDonationToCancel(null);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  return (
    <motion.div 
      style={{ display: 'flex' }}
      variants={pageAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        variants={slideIn}
        initial="initial"
        animate="animate"
      >
        <Sidebardashboard 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          showDonationsTab={isVerifiedNGO} 
        />
      </motion.div>
      <motion.div 
        style={{ flex: 1, padding: '20px' }}
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        {renderContent()}
      </motion.div>
      <Modal open={cancelModalOpen} onClose={() => setCancelModalOpen(false)}>
        <ModalDialog>
          <Typography level="body-md">
            Are you sure you want to cancel this donation?
          </Typography>
          <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ mt: 2 }}>
            <Button variant="plain" color="neutral" onClick={() => setCancelModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="solid" color="danger" onClick={handleCancel}>
              Confirm
            </Button>
          </Stack>
        </ModalDialog>
      </Modal>
    </motion.div>
  );
}

export default Dashboard;