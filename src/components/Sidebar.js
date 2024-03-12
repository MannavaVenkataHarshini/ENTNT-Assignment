import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar({ isOpen, onClose }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="close-btn" onClick={onClose}>X</div>
      <div className="sidebar-content">
        <h2>Menu</h2>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/products">Manage Products</Link>
          </li>
          <li>
            <Link to="/orders">Manage Orders</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar View</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
