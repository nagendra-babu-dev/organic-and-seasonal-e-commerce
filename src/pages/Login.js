import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf, FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { authService } from '../services/authService';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setSubmitting(true);
      const response = await authService.login(email, password);

      login(response.user, response.token);
      toast.success(response.message || 'Login successful');

      if (response.user?.userType === 'farmer') {
        navigate('/dashboard');
        return;
      }

      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setSubmitting(false);
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
                
                <Button type="submit" className="btn-organic w-100 py-2 mb-3" disabled={submitting}>
                  {submitting ? 'Signing In...' : 'Sign In'}
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
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
