import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Tooltip,
  IconButton
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TrackingList = () => {
  const [trackings, setTrackings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderBy, setOrderBy] = useState('lastUpdate');
  const [direction, setDirection] = useState('desc');
  const [selectedColumn, setSelectedColumn] = useState('lastUpdate');
  const [isAsc, setIsAsc] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrackings = async () => {
      try {
        const response = await axios.get('http://localhost:8081/tracking/all');
        setTrackings(response.data);
      } catch (err) {
        setError('Error fetching tracking data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackings();
  }, []);

  const handleSort = () => {
    const sortedTrackings = [...trackings].sort((a, b) => {
      let aValue = a[selectedColumn];
      let bValue = b[selectedColumn];

      if (selectedColumn === 'lastUpdate' || selectedColumn === 'forecast') {
        aValue = aValue ? new Date(aValue).getTime() : 0;
        bValue = bValue ? new Date(bValue).getTime() : 0;
      } else if (typeof aValue === 'string') {
        aValue = aValue.trim().toLowerCase();
        bValue = bValue.trim().toLowerCase();
      }
      
      if (aValue < bValue) return isAsc ? -1 : 1;
      if (aValue > bValue) return isAsc ? 1 : -1;
      return 0;
    });

    setTrackings(sortedTrackings);
    setOrderBy(selectedColumn);
    setDirection(isAsc ? 'asc' : 'desc');
  };

  const handleViewTrackingDetails = (tracking) => {
    navigate(`/home/tracking-view/${tracking.productCode}`, {
      state: {
        tracking: tracking,
        type: 2 // tipo deliverer
      }
    });
  };

  const getStatusText = (status) => {
    switch(status) {
      case 0: return 'Processing';
      case 1: return 'In Transit';
      case 2: return 'Delivered';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" m={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  if (trackings.length === 0) {
    return (
      <Alert severity="info" sx={{ m: 2 }}>
        No trackings found
      </Alert>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      <Typography variant="h4" gutterBottom color="primary" sx={{ p: 2 }}>
        Tracking List
      </Typography>

      <Paper sx={{ mb: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Sort by:
        </Typography>
        <FormGroup row>
          <FormControlLabel 
            control={<Checkbox checked={selectedColumn === 'productCode'} onChange={() => setSelectedColumn('productCode')} />} 
            label="Product Code" 
          />
          <FormControlLabel 
            control={<Checkbox checked={selectedColumn === 'status'} onChange={() => setSelectedColumn('status')} />} 
            label="Status" 
          />
          <FormControlLabel 
            control={<Checkbox checked={selectedColumn === 'lastUpdate'} onChange={() => setSelectedColumn('lastUpdate')} />} 
            label="Last Update" 
          />
        </FormGroup>
        <FormGroup row>
          <FormControlLabel 
            control={<Checkbox checked={isAsc} onChange={() => setIsAsc(true)} />} 
            label="Ascending" 
          />
          <FormControlLabel 
            control={<Checkbox checked={!isAsc} onChange={() => setIsAsc(false)} />} 
            label="Descending" 
          />
        </FormGroup>
        <Button variant="contained" onClick={handleSort}>
          Apply Sort
        </Button>
      </Paper>

      <TableContainer component={Paper}>
        <Table aria-label="tracking table">
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>Product Code {orderBy === 'productCode' && (direction === 'asc' ? '🔼' : '🔽')}</TableCell>
              <TableCell>Email User</TableCell>
              <TableCell>Status {orderBy === 'status' && (direction === 'asc' ? '🔼' : '🔽')}</TableCell>
              <TableCell>Location {orderBy === 'location' && (direction === 'asc' ? '🔼' : '🔽')}</TableCell>
              <TableCell>Last Update {orderBy === 'lastUpdate' && (direction === 'asc' ? '🔼' : '🔽')}</TableCell>
              <TableCell>Forecast {orderBy === 'forecast' && (direction === 'asc' ? '🔼' : '🔽')}</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trackings.map((tracking) => (
              <TableRow key={`${tracking.productCode}-${tracking.lastUpdate}`}>
                <TableCell>
                  <Tooltip title="View Tracking Details">
                    <IconButton
                      color="primary"
                      onClick={() => handleViewTrackingDetails(tracking)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>{tracking.productCode}</TableCell>
                <TableCell>{tracking.emailUser}</TableCell>
                <TableCell>{getStatusText(tracking.status)}</TableCell>
                <TableCell>{tracking.location}</TableCell>
                <TableCell>{new Date(tracking.lastUpdate).toLocaleString()}</TableCell>
                <TableCell>{tracking.forecast ? new Date(tracking.forecast).toLocaleString() : 'N/A'}</TableCell>
                <TableCell>{tracking.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TrackingList;