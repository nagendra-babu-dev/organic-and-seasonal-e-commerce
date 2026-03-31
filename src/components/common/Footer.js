import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaLeaf, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <Container>
        <Row className="g-4">
          <Col lg={4}>
            <div className="mb-3">
              <FaLeaf size={32} className="text-success mb-2" />
              <h3 className="h4 fw-bold">Organic & Seasonal</h3>
            </div>
            <p className="text-light-50">
              Connecting you directly with local farmers. Fresh, organic, and seasonal produce delivered to your doorstep.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white-50 hover-text-success"><FaFacebook size={24} /></a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="text-white-50 hover-text-success"><FaTwitter size={24} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white-50 hover-text-success"><FaInstagram size={24} /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-white-50 hover-text-success"><FaYoutube size={24} /></a>
            </div>
          </Col>
          
          <Col lg={2}>
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-white-50 text-decoration-none">Home</Link></li>
              <li className="mb-2"><Link to="/shop" className="text-white-50 text-decoration-none">Shop</Link></li>
              <li className="mb-2"><Link to="/about" className="text-white-50 text-decoration-none">About Us</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-white-50 text-decoration-none">Contact</Link></li>
            </ul>
          </Col>
          
          <Col lg={3}>
            <h5 className="fw-bold mb-3">Customer Service</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/shipping" className="text-white-50 text-decoration-none">Shipping Info</Link></li>
              <li className="mb-2"><Link to="/returns" className="text-white-50 text-decoration-none">Returns & Refunds</Link></li>
              <li className="mb-2"><Link to="/privacy" className="text-white-50 text-decoration-none">Privacy Policy</Link></li>
              <li className="mb-2"><Link to="/terms" className="text-white-50 text-decoration-none">Terms & Conditions</Link></li>
            </ul>
          </Col>
          
          <Col lg={3}>
            <h5 className="fw-bold mb-3">Contact Info</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center gap-2">
                <FaMapMarkerAlt className="text-success" />
                <span className="text-white-50">123 Organic Valley, Pune, India</span>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <FaPhone className="text-success" />
                <span className="text-white-50">+91 98765 43210</span>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <FaEnvelope className="text-success" />
                <span className="text-white-50">support@organicandseasonal.com</span>
              </li>
            </ul>
          </Col>
        </Row>
        
        <hr className="mt-4" />
        
        <div className="text-center py-3">
          <p className="mb-0 text-white-50">
            &copy; {new Date().getFullYear()} Organic & Seasonal E-Commerce. All rights reserved.
          </p>
          <small className="text-white-50">
            Supporting sustainable agriculture and local farmers
          </small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
