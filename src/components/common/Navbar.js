import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaLeaf, FaSeedling } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { authService } from '../../services/authService';

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const isFarmer = user?.userType === 'farmer';

  const getNavLinkClass = (path, extraClassName = '') => {
    const isActive = location.pathname === path;
    return `${extraClassName} ${isActive ? 'navbar-link-active' : ''}`.trim();
  };

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
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)} className={getNavLinkClass('/', 'fw-semibold')}>Home</Nav.Link>
                <Nav.Link as={Link} to="/about" onClick={() => setExpanded(false)} className={getNavLinkClass('/about', 'fw-semibold')}>About</Nav.Link>
                <Nav.Link as={Link} to="/contact" onClick={() => setExpanded(false)} className={getNavLinkClass('/contact', 'fw-semibold')}>Contact</Nav.Link>
                <Nav.Link as={Link} to="/shop" onClick={() => setExpanded(false)} className={getNavLinkClass('/shop', 'fw-semibold')}>Shop</Nav.Link>
                <Nav.Link as={Link} to="/cart" onClick={() => setExpanded(false)} className={getNavLinkClass('/cart', 'position-relative')}>
                  <FaShoppingCart size={22} />
                  {cartCount > 0 && (
                    <Badge pill bg="success" className="position-absolute top-0 start-100 translate-middle">
                      {cartCount}
                    </Badge>
                  )}
                </Nav.Link>
              </>
            )}

            {isAuthenticated && !isFarmer && (
              <Nav.Link as={Link} to="/shop" onClick={() => setExpanded(false)} className={getNavLinkClass('/shop', 'fw-semibold')}>Shop</Nav.Link>
            )}
            
            {isAuthenticated && !isFarmer && (
              <Nav.Link as={Link} to="/cart" onClick={() => setExpanded(false)} className={getNavLinkClass('/cart', 'position-relative')}>
                <FaShoppingCart size={22} />
                {cartCount > 0 && (
                  <Badge pill bg="success" className="position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>
            )}
            
            {isAuthenticated ? (
              <>
                {isFarmer ? (
                  <>
                    <Nav.Link as={Link} to="/dashboard" onClick={() => setExpanded(false)} className={getNavLinkClass('/dashboard', 'fw-semibold d-flex align-items-center gap-2')}>
                      <FaLeaf size={18} />
                      Dashboard
                    </Nav.Link>
                    <Nav.Link as={Link} to="/seller/orders" onClick={() => setExpanded(false)} className={getNavLinkClass('/seller/orders', 'fw-semibold')}>
                      Orders
                    </Nav.Link>
                    <Nav.Link as={Link} to="/seller/products" onClick={() => setExpanded(false)} className={getNavLinkClass('/seller/products', 'fw-semibold')}>
                      Products
                    </Nav.Link>
                    <Nav.Link as={Link} to="/seller/profile" onClick={() => setExpanded(false)} className={getNavLinkClass('/seller/profile', 'fw-semibold')}>
                      Profile
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/dashboard" onClick={() => setExpanded(false)} className={getNavLinkClass('/dashboard', 'fw-semibold')}>
                      Dashboard
                    </Nav.Link>
                    <Nav.Link as={Link} to="/customer/orders" onClick={() => setExpanded(false)} className={getNavLinkClass('/customer/orders', 'fw-semibold')}>
                      Orders
                    </Nav.Link>
                    <Nav.Link as={Link} to="/customer/wishlist" onClick={() => setExpanded(false)} className={getNavLinkClass('/customer/wishlist', 'fw-semibold')}>
                      Wishlist
                    </Nav.Link>
                    <Nav.Link as={Link} to="/customer/reviews" onClick={() => setExpanded(false)} className={getNavLinkClass('/customer/reviews', 'fw-semibold')}>
                      Reviews
                    </Nav.Link>
                    <Nav.Link as={Link} to="/customer/profile" onClick={() => setExpanded(false)} className={getNavLinkClass('/customer/profile', 'fw-semibold')}>
                      Profile
                    </Nav.Link>
                  </>
                )}
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
