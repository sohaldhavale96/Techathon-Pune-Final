import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, CircularProgress } from '@mui/joy';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleIcon from '@mui/icons-material/People';
import axios from 'axios';
import { motion } from 'framer-motion';
import { images } from "../../assets/images";

function AboutStats() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDistributed: 0,
    totalBeneficiaries: 0
  });

  const statItems = [
    {
      image: images.about1,
      count: "10K+",
      title: "People Fed",
    },
    {
      image: images.about2,
      count: "150+",
      title: "NGO Partners",
    },
    {
      image: images.about3,
      count: "50+",
      title: "Cities",
    },
    {
      image: images.about4,
      count: "200+",
      title: "Regular Donors",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 50,
      opacity: 0,
      scale: 0.8
    },
    show: { 
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/analytics/distribution');
        if (response.data.success) {
          const { distributionData } = response.data.data;
          const totalDistributed = distributionData.reduce((acc, curr) => acc + curr.distributed, 0);
          // Estimate beneficiaries (assuming each distribution helps 3 people on average)
          const totalBeneficiaries = Math.round(totalDistributed * 3);
          
          setStats({
            totalDistributed,
            totalBeneficiaries
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f0f0f0",
        py: 8,
        px: 4,
        textAlign: "center",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 4,
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {statItems.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <motion.img
                src={stat.image}
                alt={stat.title}
                style={{
                  width: "100%",
                  maxWidth: "200px",
                  height: "auto",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                }}
                initial={{ rotate: -5 }}
                whileHover={{ 
                  rotate: 0,
                  transition: { duration: 0.3 }
                }}
              />
              <Typography
                level="h3"
                sx={{
                  color: "primary.main",
                  fontWeight: "bold",
                  fontSize: { xs: "2rem", md: "2.5rem" },
                }}
              >
                {stat.count}
              </Typography>
              <Typography
                level="body-lg"
                sx={{
                  color: "text.secondary",
                  fontWeight: "medium",
                }}
              >
                {stat.title}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </motion.div>
    </Box>
  );
}

export default AboutStats; 