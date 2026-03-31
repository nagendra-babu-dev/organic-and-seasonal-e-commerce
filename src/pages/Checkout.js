import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatPrice, calculateDeliveryCharge } from '../utils/formatters';

const Checkout = ({ cart, cartTotal }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod'
  });
  const [submitted, setSubmitted] = useState(false);

  const deliveryCharge = calculateDeliveryCharge(cartTotal);
  const finalTotal = cartTotal + deliveryCharge;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Simulate order placement
    setTimeout(() => {
      toast.success('Order placed successfully!');
      localStorage.removeItem('cart');
      navigate('/');
    }, 1500);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Container className="py-5">
      <h1 className="display-5 fw-bold mb-4">Checkout</h1>
      
      <Row>
        <Col lg={7}>
          <Card className="border-0 shadow-sm rounded-4 mb-4">
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-4">Shipping Information</h4>
              
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Delivery Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete address"
                  />
                </Form.Group>
                
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="Pincode"
                    />
                  </Col>
                </Row>
                
                <h4 className="fw-bold mt-4 mb-3">Payment Method</h4>
                
                <Form.Group className="mb-3">
                  <Form.Check
                    type="radio"
                    label="Cash on Delivery"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    label="Credit/Debit Card"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    label="UPI (Google Pay, PhonePe, etc.)"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleChange}
                  />
                </Form.Group>
                
                <Alert variant="success" className="mt-3">
                  <strong>🌱 Farm Fresh Promise:</strong> All products are delivered within 24 hours of harvest!
                </Alert>
                
                <Button 
                  type="submit" 
                  className="btn-organic w-100 py-3 mt-3"
                  disabled={submitted}
                >
                  {submitted ? 'Placing Order...' : `Place Order • ${formatPrice(finalTotal)}`}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={5}>
          <Card className="border-0 shadow-sm rounded-4 sticky-top" style={{ top: '100px' }}>
            <Card.Body className="p-4">
              <h4 className="fw-bold mb-4">Order Summary</h4>
              
              <div className="mb-3">
                {cart.map(item => (
                  <div key={item.id} className="d-flex justify-content-between mb-2">
                    <span>{item.name} x {item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Charge</span>
                <span>{deliveryCharge === 0 ? 'Free' : formatPrice(deliveryCharge)}</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-4">
                <strong className="h5 mb-0">Total</strong>
                <strong className="h5 mb-0 text-success">{formatPrice(finalTotal)}</strong>
              </div>
              
              <div className="text-muted small">
                <p className="mb-1">✓ Free delivery on orders above £40</p>
                <p className="mb-1">✓ 100% satisfaction guarantee</p>
                <p className="mb-0">✓ Support local farmers</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
