import { Box, Card, Typography, Button, Stack } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const LoginSelector = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          p: 2
        }}
      >
        <Card
          variant="outlined"
          sx={{
            maxWidth: 600,
            width: '100%',
            textAlign: 'center',
            p: 4
          }}
        >
          <Typography level="h3" sx={{ mb: 4 }}>
            Choose Login Type
          </Typography>
          
          <Stack spacing={2}>
            <Button
              variant="soft"
              color="primary"
              size="lg"
              startDecorator={<PersonIcon />}
              onClick={() => navigate('/user-login')}
              sx={{ py: 2 }}
            >
              User Login
            </Button>
            
            <Button
              variant="soft"
              color="success"
              size="lg"
              startDecorator={<BusinessIcon />}
              onClick={() => navigate('/ngo-login')}
              sx={{ py: 2 }}
            >
              NGO Login
            </Button>
            
            <Button
              variant="soft"
              color="neutral"
              size="lg"
              startDecorator={<AdminPanelSettingsIcon />}
              onClick={() => navigate('/admin/login')}
              sx={{ py: 2 }}
            >
              Admin Login
            </Button>
          </Stack>
        </Card>
      </Box>
    </motion.div>
  );
};

export default LoginSelector; 