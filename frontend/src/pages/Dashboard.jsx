import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Tabs,
  Tab,
  Button
} from '@mui/material';
import {
  People,
  Home,
  CalendarMonth,
  AttachMoney,
  Warning,
  CheckCircle,
  Block
} from '@mui/icons-material';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [pendingProperties, setPendingProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, bookingsRes, propertiesRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/bookings/recent'),
          user.type === 'admin' ? api.get('/properties/pending') : Promise.resolve({ data: [] })
        ]);
        setStats(statsRes.data);
        setRecentBookings(bookingsRes.data);
        setPendingProperties(propertiesRes.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const handleApproveProperty = async (propertyId) => {
    try {
      await api.put(`/properties/${propertyId}/status`, { status: 'approved' });
      setPendingProperties(pendingProperties.filter(prop => prop._id !== propertyId));
    } catch (err) {
      console.error('Failed to approve property:', err);
    }
  };

  const handleRejectProperty = async (propertyId) => {
    try {
      await api.put(`/properties/${propertyId}/status`, { status: 'rejected' });
      setPendingProperties(pendingProperties.filter(prop => prop._id !== propertyId));
    } catch (err) {
      console.error('Failed to reject property:', err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const StatCard = ({ icon, title, value, color }) => (
    <Card elevation={3} sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {icon}
          <Typography variant="h6" sx={{ ml: 1 }}>{title}</Typography>
        </Box>
        <Typography variant="h4" color={color}>{value}</Typography>
      </CardContent>
    </Card>
  );

  const getStatusChip = (status) => {
    switch (status) {
      case 'pending':
        return <Chip icon={<Warning />} label="Pending" color="warning" size="small" />;
      case 'approved':
        return <Chip icon={<CheckCircle />} label="Approved" color="success" size="small" />;
      case 'rejected':
        return <Chip icon={<Block />} label="Rejected" color="error" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        {user.type === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<People color="primary" />}
            title={user.type === 'admin' ? "Total Users" : "My Bookings"}
            value={user.type === 'admin' ? stats?.users : stats?.userBookings}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<Home color="secondary" />}
            title={user.type === 'admin' ? "Properties" : "My Properties"}
            value={user.type === 'admin' ? stats?.properties : stats?.userProperties}
            color="secondary"
          />
        </Grid>
        {user.type === 'admin' && (
          <>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={<CalendarMonth color="info" />}
                title="Total Bookings"
                value={stats?.bookings}
                color="info"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={<AttachMoney color="success" />}
                title="Revenue"
                value={`$${stats?.revenue?.toLocaleString() || 0}`}
                color="success"
              />
            </Grid>
          </>
        )}
      </Grid>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Recent Bookings" />
        {user.type === 'admin' && <Tab label="Pending Approvals" />}
        <Tab label="Activity" />
      </Tabs>

      {tabValue === 0 && (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Property</TableCell>
                <TableCell>{user.type === 'admin' ? "User" : "Owner"}</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentBookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.propertyId?.title}</TableCell>
                  <TableCell>
                    {user.type === 'admin'
                      ? booking.userId?.name
                      : booking.ownerId?.name}
                  </TableCell>
                  <TableCell>
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${booking.propertyId?.price}</TableCell>
                  <TableCell>{getStatusChip(booking.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {tabValue === 1 && user.type === 'admin' && (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Property</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingProperties.map((property) => (
                <TableRow key={property._id}>
                  <TableCell>{property.title}</TableCell>
                  <TableCell>{property.userID?.name}</TableCell>
                  <TableCell>${property.price}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        onClick={() => handleApproveProperty(property._id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => handleRejectProperty(property._id)}
                      >
                        Reject
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Dashboard;
