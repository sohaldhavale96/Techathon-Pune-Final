import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import IconButton from '@mui/joy/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useNavigate } from 'react-router-dom';
import './footer.css';

function Footer() {
  const navigate = useNavigate();

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: '/about' },
    { label: 'DONATE', path: '/donate' },
    { label: 'CONTACT', path: '/contact' },
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com/mealconnect' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com/company/mealconnect' },
    { icon: <TwitterIcon />, url: 'https://twitter.com/mealconnect' },
  ];

  return (
    <Box
      component="footer"
      className="footer"
      sx={{
        backgroundColor: 'background.surface',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          maxWidth: '1200px',
          mx: 'auto',
          px: 3,
          py: 2,
        }}
      >
        {/* Navigation Links */}
        <List
          orientation="horizontal"
          sx={{
            display: 'flex',
            gap: { xs: 2, md: 4 },
            '--ListItem-radius': '8px',
          }}
        >
          {navItems.map((item) => (
            <ListItem key={item.label}>
              <Link
                component="button"
                onClick={() => navigate(item.path)}
                underline="none"
                sx={{
                  fontWeight: 500,
                  fontSize: 'sm',
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {item.label}
              </Link>
            </ListItem>
          ))}
        </List>


        {/* Social Links */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          {socialLinks.map((social, index) => (
            <IconButton
              key={index}
              variant="plain"
              color="neutral"
              component={Link}
              href={social.url}
              target="_blank"
              sx={{
                '--IconButton-size': '36px',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'primary.main',
                },
              }}
            >
              {social.icon}
            </IconButton>
          ))}
        </Box>

        {/* Copyright */}
        <Typography
          level="body-sm"
          sx={{
            width: '100%',
            textAlign: 'center',
            color: 'text.tertiary',
            pt: 2,
          }}
        >
          © {new Date().getFullYear()} MealConnect. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer; 