import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Dialog, DialogTitle, DialogContent, TextField, MenuItem, Box } from '@mui/material';
import './OrdersManagement.css';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';

function OrdersManagement() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {

    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      try {

        const parsedOrders = JSON.parse(storedOrders);
        setOrders(parsedOrders);
        localStorage.setItem('orders', storedOrders);
      } catch (error) {
        console.error('Error parsing orders:', error);
      }
    } else {


      const orders = [
        { id: 1, customer: 'Person 1', date: '2024-03-05', status: 'Pending' },
        { id: 2, customer: 'Person 2', date: '2024-03-06', status: 'Shipped' },
        { id: 3, customer: 'Person 3', date: '2024-03-07', status: 'Delivered' },
        { id: 4, customer: 'Person 4', date: '2024-03-08', status: 'Pending' },
        { id: 5, customer: 'Person 5', date: '2024-03-09', status: 'Delivered' },
        { id: 6, customer: 'Person 6', date: '2024-03-10', status: 'Pending' },
        { id: 7, customer: 'Person 7', date: '2024-03-11', status: 'Shipped' },
        { id: 8, customer: 'Person 8', date: '2024-03-12', status: 'Delivered' },
        { id: 9, customer: 'Person 9', date: '2024-03-13', status: 'Shipped' },
        { id: 10, customer: 'Person 10', date: '2024-03-14', status: 'Pending' },
        { id: 11, customer: 'Person 11', date: '2024-03-15', status: 'Pending' },
        { id: 12, customer: 'Person 12', date: '2024-03-16', status: 'Shipped' },
        { id: 13, customer: 'Person 13', date: '2024-03-17', status: 'Shipped' },
        { id: 14, customer: 'Person 14', date: '2024-03-18', status: 'Delivered' },
        { id: 15, customer: 'Person 15', date: '2024-03-19', status: 'Pending' },
        { id: 16, customer: 'Person 16', date: '2024-03-20', status: 'Delivered' },
        { id: 17, customer: 'Person 17', date: '2024-03-21', status: 'Pending' },
        { id: 18, customer: 'Person 18', date: '2024-03-22', status: 'Shipped' },
        { id: 19, customer: 'Person 19', date: '2024-03-23', status: 'Shipped' },
        { id: 20, customer: 'Person 20', date: '2024-03-24', status: 'Delivered' },
        { id: 21, customer: 'Person 21', date: '2024-03-24', status: 'Delivered' }

      ];

      localStorage.setItem('orders', JSON.stringify(orders));

      setOrders(orders);
    }
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => order.status === filter);
      setFilteredOrders(filtered);
    }
  }, [filter, orders]);


  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setOpenViewDialog(true);
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setOpenEditDialog(true);
  };

  const handleUpdateStatus = () => {
    const updatedOrders = orders.map(order =>
      order.id === selectedOrder.id ? { ...selectedOrder, status: newStatus } : order
    );
    setOrders(updatedOrders);
    setOpenEditDialog(false);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };
  const goToDashboard = () => {
    navigate('/');
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box>
      <Box className="menu-toggle" onClick={toggleSidebar}>
        <MenuIcon style={{ fontSize: "3rem" }} />

      </Box>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="90vh"
      >

        <Box className="filter-container" sx={{ position: 'sticky', top: '0', zIndex: '999', backgroundColor: 'white', marginBottom: '20px', marginTop: '10px' }}>
          <TextField
            select
            label="Filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            fullWidth
            sx={{
              position: 'sticky',
              top: '0',
              zIndex: '999',
              backgroundColor: 'white',
              marginBottom: '20px',
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
          </TextField>
          <Box className="orders-management-container" sx={{ position: 'sticky', top: '56px', zIndex: '998' }}>

            <Table className="table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color={order.status === 'Pending' ? 'primary' : order.status === 'Shipped' ? 'warning' : 'success'}
                      >
                        {order.status}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleViewOrder(order)}>View</Button>
                      <Button onClick={() => handleEditOrder(order)}>Edit Status</Button>
                      <IconButton onClick={() => handleDeleteOrder(order.id)}>
                        <DeleteIcon style={{ color: 'red' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)}>
            <DialogTitle>Order Details</DialogTitle>
            <DialogContent>
              <p>ID: {selectedOrder ? selectedOrder.id : ''}</p>
              <p>Customer: {selectedOrder ? selectedOrder.customer : ''}</p>
              <p>Date: {selectedOrder ? selectedOrder.date : ''}</p>
              <p>Status: {selectedOrder ? selectedOrder.status : ''}</p>
            </DialogContent>
          </Dialog>

          <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
            <DialogTitle>Edit Order Status</DialogTitle>
            <DialogContent>
              <TextField
                select
                label="Status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                fullWidth
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="Delivered  ">Delivered</MenuItem>
              </TextField>
              <Button onClick={handleUpdateStatus}>Update Status</Button>
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
      <Box className="backbox">
        <Button onClick={goToDashboard} variant='contained' className='backDash' >
          Back
        </Button>
      </Box>
    </Box>
  );
}
export default OrdersManagement;
