import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf, FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Demo login - In production, this would be an API call
    if (email === 'demo@organic.com' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify({ email, name: 'Demo User' }));
      toast.success('Login successful!');
      navigate('/');
    } else if (email === 'farmer@organic.com' && password === 'farmer') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify({ email, name: 'Demo Farmer', role: 'farmer' }));
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="border-0 shadow-lg rounded-4">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <FaLeaf size={48} className="text-success mb-3" />
                <h2 className="fw-bold">Welcome Back</h2>
                <p className="text-muted">Sign in to your account</p>
              </div>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <div className="position-relative">
                    <FaEnvelope className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      className="ps-5 py-2"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <div className="position-relative">
                    <FaLock className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      className="ps-5 py-2"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </Form.Group>
                
                <Button type="submit" className="btn-organic w-100 py-2 mb-3">
                  Sign In
                </Button>
                
                <div className="text-center">
                  <Link to="/forgot-password" className="text-success text-decoration-none small">
                    Forgot Password?
                  </Link>
                </div>
              </Form>
              
              <hr className="my-4" />
              
              <div className="text-center">
                <p className="mb-0 text-muted">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-success fw-bold text-decoration-none">
                    Sign Up
                  </Link>
                </p>
                <small className="text-muted mt-2 d-block">
                  Demo: demo@organic.com / password
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;