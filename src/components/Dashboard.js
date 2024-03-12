import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';

function Dashboard() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProductCount(parsedProducts.length);
      const totalPrice = parsedProducts.reduce((total, product) => total + parseFloat(product.price), 0);
      setPrice(totalPrice);
      const availableStock = parsedProducts.filter(product => product.stock === 'available').length;
      const notAvailableStock = parsedProducts.filter(product => product.stock === 'not available').length;

      setStock({ available: availableStock, notAvailable: notAvailableStock });
    }

    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      const parsedOrders = JSON.parse(storedOrders);
      setTotalOrders(parsedOrders.length);
    }


  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box className="dashboard-container">
      <Box className="menu-toggle" onClick={toggleSidebar}>
        <MenuIcon style={{ fontSize: "3rem" }} />
      </Box>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <Box className="metrics-summary">
        
        <Box className="metric-card">
          <Card className="metric" style={{ width: '300px' }}>
            <CardContent className='productcard'>
              <Typography variant="h5" component="h3" color="white">Total Products Count</Typography>
              <Typography variant="body1" color="white" component="p">{productCount}</Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box className="metric-card">
          <Card className="metric" style={{ width: '300px' }}>
            <CardContent className='ordercard' >
              <Typography variant="h5" component="h3" color="white">Total Orders Count</Typography>
              <Typography variant="body1" component="p" color="white">{totalOrders}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box className="metric-card">
          <Card className="metric" style={{ width: '300px' }}>
            <CardContent className='pricecard' >
              <Typography variant="h5" component="h3" color="white">Total Price</Typography>
              <Typography variant="body1" component="p" color="white">{price}</Typography>
            </CardContent>
          </Card>
        </Box>
        
        <Box className="metric-card">
          <Card className="metric" style={{ width: '300px' }}>
            <CardContent className='stockcard' >
              <Typography variant="h5" component="h3" color="white">Total Stock</Typography>
              <Typography variant="body1" component="p" color="white">
                Available: {stock.available}
              </Typography>
              <Typography variant="body1" component="p" color="white">
                Not Available: {stock.notAvailable}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Box className="navigation-links" marginLeft={18} marginTop={4}>
        <Box style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <Typography className="linkTypography" variant="h6" style={{ marginRight: "10px" }}>
            <b>Manage Products</b>
          </Typography>
          <Link to="/products" className="link">
            <OpenInNewIcon />
          </Link>
        </Box>
        <Box style={{ display: "flex", alignItems: "center", marginBottom: "20px", marginTop: "2px" }}>
          <Typography className="linkTypography" variant="h6" style={{ marginRight: "10px" }}>
            <b>Manage Orders</b>
          </Typography>
          <Link to="/orders" className="link">
            <OpenInNewIcon />
          </Link>
        </Box>
        <Box style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <Typography className="linkTypography" variant="h6" style={{ marginRight: "10px" }}>
            <b>Calendar View</b>
          </Typography>
          <Link to="/calendar" className="link">
            <OpenInNewIcon />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
export default Dashboard;