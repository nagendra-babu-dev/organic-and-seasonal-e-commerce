import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaShoppingBag, FaHeart, FaLeaf, FaUser } from 'react-icons/fa';

const DashboardSidebar = ({ activeTab, onTabChange, userType }) => {
  const tabs = [
    { id: 'orders', label: 'My Orders', icon: FaShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: FaHeart }
  ];

  if (userType === 'farmer') {
    tabs.push({ id: 'products', label: 'My Products', icon: FaLeaf });
  }

  tabs.push({ id: 'profile', label: 'Profile', icon: FaUser });

  return (
    <Nav className="flex-column gap-2">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <Nav.Link
            key={tab.id}
            className={`d-flex align-items-center gap-2 rounded-3 ${activeTab === tab.id ? 'bg-success text-white' : 'text-dark'}`}
            onClick={() => onTabChange(tab.id)}
            style={{ cursor: 'pointer', padding: '12px 16px' }}
          >
            <Icon size={18} />
            <span>{tab.label}</span>
          </Nav.Link>
        );
      })}
    </Nav>
  );
};

export default DashboardSidebar;