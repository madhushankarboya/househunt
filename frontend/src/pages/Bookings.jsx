import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button
} from '@mui/material';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        let res;
        if (user.type === 'owner') {
          res = await api.get('/bookings/owner');
        } else {
          res = await api.get('/bookings/my-bookings');
        }
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/bookings/${id}/status`, { status });
      setBookings(bookings.map(booking =>
        booking._id === id ? { ...booking, status } : booking
      ));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography>Loading bookings...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Bookings
      </Typography>

      {bookings.length === 0 ? (
        <Typography>No bookings found</Typography>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Property</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
                {user.type === 'owner' && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>
                    <Typography fontWeight="medium">
                      {booking.propertyId?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {booking.propertyId?.address?.city}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={booking.status}
                      color={
                        booking.status === 'approved' ? 'success' :
                        booking.status === 'rejected' ? 'error' : 'warning'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    ${booking.propertyId?.price?.toLocaleString()}
                  </TableCell>
                  {user.type === 'owner' && (
                    <TableCell>
                      {booking.status === 'pending' && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            color="success"
                            onClick={() => handleStatusUpdate(booking._id, 'approved')}
                          >
                            Approve
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                          >
                            Reject
                          </Button>
                        </Box>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Bookings;
