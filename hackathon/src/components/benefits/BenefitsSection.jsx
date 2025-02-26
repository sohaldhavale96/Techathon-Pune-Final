import { Box, Typography, Card, CardContent } from '@mui/joy';
import Grid from '@mui/joy/Grid';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PublicIcon from '@mui/icons-material/Public';
import './benefits.css';
import img1 from "../../assets/benefits/Stop.webp"
import img2 from "../../assets/benefits/Feed.jpg"

const benefits = [
  {
    title: "Reduce Food Waste",
    icon: <RestaurantIcon sx={{ fontSize: 60, color: 'primary.500' }} />,
    description: "Help reduce the 1.3 billion tonnes of food wasted annually by donating excess food to those in need. Your contribution can make a significant impact in reducing food waste and helping the environment.",
    image: img1
  },
  {
    title: "Feed the Hungry",
    icon: <VolunteerActivismIcon sx={{ fontSize: 60, color: 'primary.500' }} />,
    description: "Your food donations directly help feed hungry individuals and families in our community. One donation can provide multiple meals to those experiencing food insecurity.",
    image: img2
  },
  {
    title: "Environmental Impact",
    icon: <PublicIcon sx={{ fontSize: 60, color: 'primary.500' }} />,
    description: "Food waste in landfills produces harmful greenhouse gases. By donating food, you help reduce methane emissions and contribute to environmental sustainability.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1513&q=80"
  }
];

function BenefitsSection() {
  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 2, md: 6 },
        backgroundColor: '#f8f9fa',
      }}
    >
      <Typography
        level="h1"
        sx={{
          mb: 2,
          textAlign: 'center',
          fontSize: { xs: '2rem', md: '3rem' },
          fontWeight: 'bold',
          color: 'primary.main'
        }}
      >
        Benefits of Food Donation
      </Typography>
      
      <Typography
        level="body1"
        sx={{
          mb: 6,
          textAlign: 'center',
          maxWidth: '800px',
          mx: 'auto',
          color: 'text.secondary'
        }}
      >
        Your food donations create positive impact in multiple ways. 
        Here's how your contribution makes a difference.
      </Typography>

      <Grid 
        container 
        spacing={4}
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
        }}
      >
        {benefits.map((benefit, index) => (
          <Grid key={index} xs={12} md={4}>
            <Card
              className="benefit-card"
              sx={{
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 'lg',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Box
                  className="benefit-image"
                  sx={{
                    height: 200,
                    mb: 3,
                    borderRadius: 'md',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  {benefit.icon}
                </Box>
                <Typography
                  level="h4"
                  sx={{
                    mb: 2,
                    color: 'primary.main',
                  }}
                >
                  {benefit.title}
                </Typography>
                <Typography 
                  level="body1"
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  {benefit.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default BenefitsSection; 