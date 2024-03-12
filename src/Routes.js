import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProductsManagement from './components/ProductsManagement';
import OrdersManagement from './components/OrdersManagement';
import CalendarView from './components/CalendarView';
import Sidebar from './components/Sidebar';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<ProductsManagement />} />
        <Route path="/orders" element={<OrdersManagement />} />
        <Route path="/calendar" element={<CalendarView/>}/>
        <Route path="/sidebar" element={<Sidebar/>}/>


      </Routes>
    </Router>
  );
}

export default AppRoutes;
