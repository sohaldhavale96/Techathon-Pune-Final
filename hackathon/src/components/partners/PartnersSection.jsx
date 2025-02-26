import { Box, Typography } from '@mui/joy';
import './partners.css';

import img1 from "../../assets/ngos/1200x630wa.png"
import img2 from "../../assets/ngos/AkshayaPatra Logo_800X800 px.jpg"
import img3 from "../../assets/ngos/SDLogo1024_New.png"
import img4 from "../../assets/ngos/unnamed.jpg"
import img5 from "../../assets/ngos/th (5).jpeg"

const partners = [
  {
    name: "Raisin Foundation",
    logo: img1,
    link: "#"
  },
  {
    name: "Aflere NGO",
    logo: img2,
    link: "#"
  },
  {
    name: "CREO Foundation",
    logo: img3,
    link: "#"
  },
  {
    name: "iCare Foundation",
    logo: img4,
    link: "#"
  },
  {
    name: "Lycetts Trust",
    logo: img5,
    link: "#"
  }
];

function PartnersSection() {
  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 2, md: 6 },
        backgroundColor: 'background.surface',
        textAlign: 'center'
      }}
    >
      <Typography
        level="h2"
        sx={{
          mb: 4,
          fontSize: { xs: '1.75rem', md: '2.5rem' },
          fontWeight: 'bold',
          color: 'primary.main'
        }}
      >
        Our NGO Partners
      </Typography>

      <Typography
        level="body1"
        sx={{
          mb: 6,
          maxWidth: '800px',
          mx: 'auto',
          color: 'text.secondary'
        }}
      >
        We collaborate with trusted NGOs to ensure your donations reach those who need them most
      </Typography>

      <Box
        className="partners-grid"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: { xs: 4, md: 6 },
          maxWidth: '1200px',
          mx: 'auto'
        }}
      >
        {partners.map((partner, index) => (
          <Box
            key={index}
            className="partner-logo"
            sx={{
              width: { xs: '150px', md: '180px' },
              height: { xs: '80px', md: '100px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              filter: 'grayscale(100%)',
              opacity: 0.7,
              transition: 'all 0.3s ease',
              '&:hover': {
                filter: 'grayscale(0%)',
                opacity: 1,
                transform: 'scale(1.05)'
              }
            }}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default PartnersSection; 