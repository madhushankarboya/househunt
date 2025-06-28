import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 10 }}>
      <Typography variant="h1" gutterBottom>404</Typography>
      <Typography variant="h4" gutterBottom>Page Not Found</Typography>
      <Typography variant="body1" paragraph>
        The page you are looking for might have been removed or doesn't exist.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;