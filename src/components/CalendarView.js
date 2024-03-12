import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Pie } from 'react-chartjs-2';
import './Calendar.css';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArcElement } from "chart.js"; 
import Chart from "chart.js/auto";
import MenuIcon from '@mui/icons-material/Menu'; 
import Sidebar from './Sidebar'; 


function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [orders, setOrders] = useState([]);
  const [countPending, setCountPending] = useState(0);
  const [countShipped, setCountShipped] = useState(0);
  const [countDelivered, setCountDelivered] = useState(0);
  const chartRef = useRef(null);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };
  const goToDashboard = () => {
    navigate('/'); 
  };

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  }, []);

  useEffect(() => {
    const ordersForSelectedDate = orders.filter(order => {
      const deliveryDate = new Date(order.date);
      return deliveryDate.toDateString() === selectedDate.toDateString();
    });

    const pendingCount = ordersForSelectedDate.filter(order => order.status === 'Pending').length;
    const shippedCount = ordersForSelectedDate.filter(order => order.status === 'Shipped').length;
    const deliveredCount = ordersForSelectedDate.filter(order => order.status === 'Delivered').length;

    setCountPending(pendingCount);
    setCountShipped(shippedCount);
    setCountDelivered(deliveredCount);

    const data = {
      labels: ['Pending', 'Shipped', 'Delivered'],
      datasets: [{
        label: 'Orders',
        data: [pendingCount, shippedCount, deliveredCount],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      }]
    };

    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.data = data;
      chartRef.current.chartInstance.update();
    }
  }, [selectedDate, orders]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <Box>
      <Box className="menu-toggle" onClick={toggleSidebar}>
        <MenuIcon style={{ fontSize: "3rem" }} /> 
      </Box>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Calendar
        value={selectedDate}
        onChange={handleDateClick}
        className="custom-calendar"
      />
      <Box marginTop={4} width="100%" display="flex" justifyContent="center" alignItems="center">
        <Box marginLeft={4}>
          <Pie
            data={{
              labels: ['Pending', 'Shipped', 'Delivered'],
              datasets: [{
                label: 'Orders',
                data: [countPending, countShipped, countDelivered],
                backgroundColor: ['#1976D2', '#ED6C02', '#2E7D32'],
                hoverBackgroundColor: ['#1976D2', '#ED6C02', '#2E7D32'],
              }]
            }}
            ref={chartRef}
          />
        </Box>
        <Box>
          <Typography variant="h5" align="center">Orders for {selectedDate.toLocaleDateString()}</Typography>
          <Typography variant="body1" align="center" style={{ color: '#1976D2', marginTop: '10px' }}>Pending: {countPending}</Typography>
          <Typography variant="body1" align="center" style={{ color: '#ED6C02', marginTop: '10px' }}>Shipped: {countShipped}</Typography>
          <Typography variant="body1" align="center" style={{ color: '#2E7D32', marginTop: '10px' }}>Delivered: {countDelivered}</Typography>
        </Box>
      </Box>
      <Box className="calanderbackbox">
      <Button onClick={goToDashboard} variant='contained'>
        Back
      </Button>
      </Box>
    </Box>
    </Box>
  );
}

export default CalendarView;
