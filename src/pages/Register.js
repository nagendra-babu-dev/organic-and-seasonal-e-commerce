import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf, FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'customer'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // Demo registration - In production, this would be an API call
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify({ 
      email: formData.email, 
      name: formData.name,
      userType: formData.userType 
    }));
    toast.success('Registration successful!');
    navigate('/');
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={7} lg={6}>
          <Card className="border-0 shadow-lg rounded-4">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <FaLeaf size={48} className="text-success mb-3" />
                <h2 className="fw-bold">Create Account</h2>
                <p className="text-muted">Join our organic community</p>
              </div>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <div className="position-relative">
                        <FaUser className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          className="ps-5 py-2"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <div className="position-relative">
                        <FaPhone className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                        <Form.Control
                          type="tel"
                          name="phone"
                          placeholder="Enter phone number"
                          className="ps-5 py-2"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <div className="position-relative">
                    <FaEnvelope className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="ps-5 py-2"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <div className="position-relative">
                        <FaLock className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Create password"
                          className="ps-5 py-2"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <div className="position-relative">
                        <FaLock className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm password"
                          className="ps-5 py-2"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-4">
                  <Form.Label>I am a:</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="Customer"
                      name="userType"
                      value="customer"
                      checked={formData.userType === 'customer'}
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Farmer/Seller"
                      name="userType"
                      value="farmer"
                      checked={formData.userType === 'farmer'}
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>
                
                <Button type="submit" className="btn-organic w-100 py-2 mb-3">
                  Create Account
                </Button>
              </Form>
              
              <hr className="my-4" />
              
              <div className="text-center">
                <p className="mb-0 text-muted">
                  Already have an account?{' '}
                  <Link to="/login" className="text-success fw-bold text-decoration-none">
                    Sign In
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;