import { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const BookingForm = ({ propertyId, ownerId }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    message: '',
    phone: user?.phone || ''
  });
  const [open, setOpen] = useState(true);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/bookings', {
        propertyId,
        ownerId,
        message: formData.message,
        phone: formData.phone
      });
      setOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking request failed');
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Book Property Viewing</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Typography color="error" gutterBottom>
              {error}
            </Typography>
          )}

          <TextField
            label="Your Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Message to Owner"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Send Request
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BookingForm;
