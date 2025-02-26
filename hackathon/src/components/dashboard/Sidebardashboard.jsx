// import { useState } from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TableChartIcon from '@mui/icons-material/TableChart';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';

function Sidebardashboard({ activeTab, onTabChange }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: <PersonIcon /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChartIcon /> },
    { id: 'inaction', label: 'In Action', icon: <TableChartIcon /> },
    { id: 'history', label: 'History', icon: <HistoryIcon /> }
  ];

  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        backgroundColor: '#f0f0f0', // Optional background color
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography level="h4" sx={{ mb: 2, textAlign: 'center' }}>
        Dashboard
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemButton
              selected={activeTab === item.id}
              onClick={() => onTabChange(item.id)}
            >
              {item.icon}
              <span style={{ marginLeft: '10px' }}>{item.label}</span>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mt: 'auto', mb: 1 }} />
      <ListItem>
        <ListItemButton 
          onClick={handleLogout}
          sx={{
            color: 'danger.main',
            '&:hover': {
              bgcolor: 'danger.softBg',
            }
          }}
        >
          <ListItemDecorator>
            <LogoutIcon color="danger" />
          </ListItemDecorator>
          Logout
        </ListItemButton>
      </ListItem>
    </Box>
  );
}

export default Sidebardashboard;