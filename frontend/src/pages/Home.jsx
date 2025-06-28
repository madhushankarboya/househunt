import { Container, Grid, Typography, Box, Button } from '@mui/material';
import PropertyCard from '../components/PropertyCard';
import { useEffect, useState } from 'react';
import api from '../services/api';
import heroImage from '../assets/images/hero.jpg';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get('/properties?limit=6');
        setProperties(res.data.data); // ✅ Corrected: access .data array
      } catch (err) {
        console.error('Failed to fetch properties:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: '60vh',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          p: 3,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Find Your Perfect Home
          </Typography>
          <Typography variant="h5" gutterBottom>
            Discover thousands of properties for rent and sale
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3 }}
            href="/properties"
          >
            Browse Properties
          </Button>
        </Container>
      </Box>

      {/* Featured Properties Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
          Featured Properties
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" textAlign="center" mb={6}>
          Discover our handpicked selection of premium properties
        </Typography>

        {loading ? (
          <Typography textAlign="center">Loading properties...</Typography>
        ) : (
          <Grid container spacing={4}>
            {Array.isArray(properties) && properties.map((property) => (
              <Grid item xs={12} sm={6} md={4} key={property._id}>
                <PropertyCard property={property} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Home;
