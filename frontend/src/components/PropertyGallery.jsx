import { Box } from '@mui/material';

const PropertyGallery = ({ images }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <img
        src={images[0] || 'https://via.placeholder.com/800x500'}
        alt="Property"
        style={{ width: '100%', borderRadius: 8, maxHeight: 500, objectFit: 'cover' }}
      />
    </Box>
  );
};

export default PropertyGallery;