import { Box, Container, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        backgroundColor: 'primary.main',
        color: 'white'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              HouseHunt
            </Typography>
            <Typography variant="body2">
              Find your perfect rental home with our extensive property listings and powerful search tools.
            </Typography>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom>
              Company
            </Typography>
            <Link href="#" color="inherit" display="block">
              About Us
            </Link>
            <Link href="#" color="inherit" display="block">
              Careers
            </Link>
            <Link href="#" color="inherit" display="block">
              Blog
            </Link>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" gutterBottom>
              Support
            </Typography>
            <Link href="#" color="inherit" display="block">
              Help Center
            </Link>
            <Link href="#" color="inherit" display="block">
              Contact Us
            </Link>
            <Link href="#" color="inherit" display="block">
              Privacy Policy
            </Link>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Subscribe to our newsletter
            </Typography>
            <Typography variant="body2">
              Get the latest updates on new properties and special offers
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ pt: 4, mt: 4, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} HouseHunt. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;