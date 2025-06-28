import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Chip,
  Paper,
  Avatar,
  IconButton,
  Rating,
  Tabs,
  Tab
} from '@mui/material';
import {
  LocationOn,
  Bed,
  Bathtub,
  SquareFoot,
  Favorite,
  Share,
  ArrowBack
} from '@mui/icons-material';
import api from '../services/api';
import BookingForm from '../components/BookingForm';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography>Loading property details...</Typography>
      </Container>
    );
  }

  if (!property) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography>Property not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back to Properties
      </Button>

      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 4 }}>
            <img
              src={property.images[0] || 'https://via.placeholder.com/800x500'}
              alt={property.title}
              style={{ width: '100%', borderRadius: 8, maxHeight: 500, objectFit: 'cover' }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h4" fontWeight="bold">
              {property.title}
            </Typography>
            <Box>
              <IconButton sx={{ mr: 1 }}>
                <Favorite />
              </IconButton>
              <IconButton>
                <Share />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOn fontSize="small" color="action" />
            <Typography variant="body1" ml={0.5} color="text.secondary">
              {property.address.street}, {property.address.city}, {property.address.state}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Chip
              label={property.adType}
              color={property.adType === 'Rent' ? 'primary' : 'secondary'}
              sx={{ mr: 2 }}
            />
            <Typography variant="h5" fontWeight="bold" color="primary">
              ${property.price.toLocaleString()}{property.adType === 'Rent' ? '/mo' : ''}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
              <Bed sx={{ mr: 1, color: 'primary.main' }} />
              <Typography>{property.bedrooms} Bedrooms</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
              <Bathtub sx={{ mr: 1, color: 'primary.main' }} />
              <Typography>{property.bathrooms} Bathrooms</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SquareFoot sx={{ mr: 1, color: 'primary.main' }} />
              <Typography>{property.area.toLocaleString()} sqft</Typography>
            </Box>
          </Box>

          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
            <Tab label="Description" />
            <Tab label="Amenities" />
            <Tab label="Location" />
          </Tabs>

          {activeTab === 0 && (
            <Typography variant="body1" paragraph>
              {property.description}
            </Typography>
          )}

          {activeTab === 1 && (
            <Grid container spacing={2}>
              {property.amenities.map((amenity, index) => (
                <Grid item xs={6} sm={4} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 8, height: 8, bgcolor: 'primary.main', borderRadius: '50%', mr: 1 }} />
                    <Typography>{amenity}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          {activeTab === 2 && (
            <Box sx={{ height: 400, bgcolor: 'grey.100', borderRadius: 2 }}>
              <Typography align="center" sx={{ pt: 15 }}>
                Map view coming soon
              </Typography>
            </Box>
          )}
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 20 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Contact Owner
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ width: 56, height: 56, mr: 2 }} />
              <Box>
                <Typography fontWeight="bold">John Smith</Typography>
                <Typography variant="body2" color="text.secondary">
                  Property Owner
                </Typography>
                <Rating value={4.5} precision={0.5} readOnly size="small" />
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Phone
              </Typography>
              <Typography fontWeight="medium">
                {property.ownerContact}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography fontWeight="medium">
                owner@example.com
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={() => setShowBookingForm(true)}
            >
              Book a Viewing
            </Button>
          </Paper>

          {showBookingForm && (
            <Box sx={{ mt: 3 }}>
              <BookingForm propertyId={property._id} ownerId={property.userID} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PropertyDetails;
