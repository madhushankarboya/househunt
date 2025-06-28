import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Chip, Box, Rating } from '@mui/material';
import { LocationOn, Bed, Bathtub, SquareFoot, Favorite } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  if (!property) return null; // or show loading/error UI

  const {
    images = [],
    adType = '',
    price = 0,
    title = 'No title',
    address = {},
    bedrooms = 0,
    bathrooms = 0,
    area = 0,
    _id = ''
  } = property;

  const imageUrl = images[0] || 'https://via.placeholder.com/400x300';
  const street = address.street || 'Unknown Street';
  const city = address.city || 'Unknown City';

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
        <Chip 
          label={adType} 
          color={adType === 'Rent' ? 'primary' : 'secondary'} 
          size="small" 
        />
      </Box>
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold">
            ${price.toLocaleString()}{adType === 'Rent' ? '/mo' : ''}
          </Typography>
          <Rating value={4.5} precision={0.5} size="small" readOnly />
        </Box>
        
        <Typography variant="subtitle1" fontWeight="medium" mt={1}>
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" ml={0.5}>
            {street}, {city}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Bed fontSize="small" color="action" />
            <Typography variant="body2" ml={0.5}>{bedrooms} Beds</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Bathtub fontSize="small" color="action" />
            <Typography variant="body2" ml={0.5}>{bathrooms} Baths</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SquareFoot fontSize="small" color="action" />
            <Typography variant="body2" ml={0.5}>{area} sqft</Typography>
          </Box>
        </Box>
      </CardContent>
      
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          variant="outlined" 
          color="primary" 
          component={Link} 
          to={`/property/${_id}`}
          fullWidth
          sx={{ mr: 1 }}
        >
          View Details
        </Button>
        <Button variant="contained" color="secondary" sx={{ minWidth: 40 }}>
          <Favorite />
        </Button>
      </Box>
    </Card>
  );
};

export default PropertyCard;
