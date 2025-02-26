// import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Agreementmodal from '../modals/Agreementmodal';
import video from "../../assets/video/WhatsApp Video 2025-02-22 at 20.03.34_afb9e94a.mp4"

function Imagetext() {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Image Side */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: '#f0f0f0',
        }}
      >
        <video
          src={video}
          alt="Example"
          autoPlay
          loop
          muted
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
          className='rounded-xl shadow-2xl'
        />
      </Box>

      {/* Text Side */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <Typography level="h2" sx={{ mb: 2 }}>
          Welcome to Our Food Donation Platform
        </Typography>
        <Typography level="body1" sx={{ mb: 3 }}>
          We are dedicated to reducing food waste and helping those in need. Join us in our mission to make a difference.
        </Typography>
        <Agreementmodal />
      </Box>
    </Box>
  );
}

export default Imagetext;