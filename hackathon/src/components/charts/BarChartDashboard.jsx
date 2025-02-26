import { useState, useEffect, useMemo } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, CardContent, Typography, Grid, Box, Select, Option, CircularProgress } from '@mui/joy';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { useAuth } from '../../context/AuthContext';

const chartSetting = {
  height: 400,
  sx: {
    '& .MuiBarElement-root': {
      fill: '#2196f3',
      '&:hover': {
        fill: '#1976d2',
      }
    },
    '& .MuiChartsAxis-line': {
      stroke: '#919EAB',
    },
    '& .MuiChartsAxis-tick': {
      stroke: '#919EAB',
    },
  }
};

const valueFormatter = (value) => `${value} servings`;

function BarChartDashboard() {
  const { user } = useAuth();
  const [timeFilter, setTimeFilter] = useState('daily');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analyticsData, setAnalyticsData] = useState({
    distributionData: [],
    impactMetrics: {
      plasticAvoided: 0,
      energySaved: 0,
      waterSaved: 0
    }
  });

  // Memoize the stats cards to prevent unnecessary re-renders
  const statsCards = useMemo(() => [
    {
      title: "Food Donations",
      value: analyticsData.impactMetrics.plasticAvoided.toLocaleString(),
      subtitle: "Single Use Plastic Avoided",
      icon: <RestaurantIcon sx={{ fontSize: 40, color: '#2196f3' }} />,
      trend: `${Math.round(analyticsData.impactMetrics.plasticAvoided / 7)} average servings/day`
    },
    {
      title: "Energy Saved",
      value: analyticsData.impactMetrics.energySaved.toLocaleString(),
      subtitle: "kWh of electricity saved",
      icon: <ElectricBoltIcon sx={{ fontSize: 40, color: '#2196f3' }} />,
      trend: "Through food waste reduction"
    },
    {
      title: "Water Saved",
      value: analyticsData.impactMetrics.waterSaved.toLocaleString(),
      subtitle: "Gallons of water saved",
      icon: <WaterDropIcon sx={{ fontSize: 40, color: '#2196f3' }} />,
      trend: "Through efficient distribution"
    }
  ], [analyticsData.impactMetrics]); // Add dependency array

  useEffect(() => {
    let isMounted = true;

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        const response = await fetch(
          `http://localhost:3000/api/analytics/distribution?period=${timeFilter}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch analytics');
        }

        if (isMounted && data.success) {
          setAnalyticsData(data.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to fetch analytics data');
          console.error('Analytics fetch error:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (user) {
      fetchAnalytics();
    }

    return () => {
      isMounted = false;
    };
  }, [timeFilter, user]);

  if (!user) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography level="h5">Please log in to view analytics</Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2, textAlign: 'center', color: 'danger.main' }}>
        <Typography level="h5">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((card, index) => (
          <Grid key={index} xs={12} md={4}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 'md',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {card.icon}
                  <Typography level="h4" sx={{ ml: 2 }}>
                    {card.value}
                  </Typography>
                </Box>
                <Typography level="title-lg" sx={{ mb: 1 }}>
                  {card.title}
                </Typography>
                <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                  {card.subtitle}
                </Typography>
                <Typography level="body-xs" sx={{ color: 'primary.main', mt: 1 }}>
                  {card.trend}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Chart */}
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography level="h4">
              Food Distribution Trends
            </Typography>
            <Select
              value={timeFilter}
              onChange={(_, value) => setTimeFilter(value)}
              sx={{ minWidth: 120 }}
            >
              <Option value="daily">Daily</Option>
              <Option value="monthly">Monthly</Option>
              <Option value="yearly">Yearly</Option>
            </Select>
          </Box>
          <Box sx={{ width: '100%', height: 400 }}>
            <BarChart
              dataset={analyticsData.distributionData}
              xAxis={[{ 
                scaleType: 'band', 
                dataKey: 'date',
                tickLabelStyle: {
                  fill: '#919EAB',
                },
              }]}
              series={[
                { 
                  dataKey: 'received',
                  label: 'Food Received',
                  valueFormatter,
                  color: '#90caf9'
                },
                { 
                  dataKey: 'distributed',
                  label: 'Food Distributed',
                  valueFormatter,
                  color: '#2196f3'
                }
              ]}
              slotProps={{
                legend: {
                  direction: 'row',
                  position: { vertical: 'top', horizontal: 'right' },
                  padding: 0,
                }
              }}
              {...chartSetting}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default BarChartDashboard;