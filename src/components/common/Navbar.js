import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaLeaf, FaSeedling } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { authService } from '../../services/authService';

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();

  const handleLogout = async () => {
    await authService.logout();
    logout();
    navigate('/');
    setExpanded(false);
  };

  return (
    <BootstrapNavbar expand="lg" className="navbar-custom" sticky="top" expanded={expanded}>
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="navbar-brand-custom" onClick={() => setExpanded(false)}>
          <FaLeaf className="me-2" style={{ color: '#2e7d32' }} />
          Organic & Seasonal
          <FaSeedling className="ms-2" style={{ color: '#8bc34a' }} />
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={() => setExpanded(expanded ? false : true)}
        />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)} className="fw-semibold">Home</Nav.Link>
            <Nav.Link as={Link} to="/shop" onClick={() => setExpanded(false)} className="fw-semibold">Shop</Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={() => setExpanded(false)} className="fw-semibold">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={() => setExpanded(false)} className="fw-semibold">Contact</Nav.Link>
            
            <Nav.Link as={Link} to="/cart" onClick={() => setExpanded(false)} className="position-relative">
              <FaShoppingCart size={22} />
              {cartCount > 0 && (
                <Badge pill bg="success" className="position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>
            
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/dashboard" onClick={() => setExpanded(false)}>
                  <FaUser size={20} />
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="text-danger fw-semibold">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" onClick={() => setExpanded(false)} className="btn-outline-organic px-3 py-1">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" onClick={() => setExpanded(false)} className="btn-organic px-3 py-1 text-white">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
