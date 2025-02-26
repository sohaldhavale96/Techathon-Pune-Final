import { Box, Button, Card, CardContent, Typography } from '@mui/joy';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from 'react-router-dom';

function VerifyNGOSection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: 8,
        px: 4,
        backgroundColor: '#f8f9fa',
        textAlign: 'center'
      }}
    >
      <Typography level="h2" sx={{ mb: 4, color: 'primary.main' }}>
        Verify as NGO Partner
      </Typography>
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
          flexWrap: 'wrap',
          maxWidth: 1200,
          mx: 'auto'
        }}
      >
        <Card
          variant="outlined"
          sx={{
            maxWidth: 350,
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: 'md'
            }
          }}
        >
          <CardContent>
            <VerifiedIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography level="h4" sx={{ mb: 2 }}>
              Join Our Network
            </Typography>
            <Typography sx={{ mb: 3 }}>
              Register your NGO with us to receive regular food donations and help distribute to those in need.
            </Typography>
            <Button 
              variant="solid" 
              color="primary"
              onClick={() => navigate('/ngo-registration')}
              startDecorator={<VerifiedIcon />}
            >
              Get Verified
            </Button>
          </CardContent>
        </Card>

        <Card
          variant="outlined"
          sx={{
            maxWidth: 350,
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: 'md'
            }
          }}
        >
          <CardContent>
            <Typography level="h4" sx={{ mb: 2 }}>
              Benefits
            </Typography>
            <Box sx={{ textAlign: 'left' }}>
              <Typography component="ul" sx={{ pl: 2 }}>
                <li>Direct access to food donations</li>
                <li>Real-time donation notifications</li>
                <li>Verified NGO badge</li>
                <li>Analytics dashboard</li>
                <li>Priority support</li>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default VerifyNGOSection; 