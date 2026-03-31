import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { formatPrice, formatDate } from '../utils/formatters';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    navigate('/');
    return null;
  }

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-lg rounded-4 text-center p-5">
        <FaCheckCircle size={80} className="text-success mx-auto mb-4" />
        <h2 className="fw-bold mb-3">Order Confirmed!</h2>
        <p className="lead text-muted mb-4">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        
        <div className="bg-light rounded-4 p-4 mb-4 text-start">
          <h5 className="fw-bold mb-3">Order Details</h5>
          <p><strong>Order ID:</strong> #{order.id}</p>
          <p><strong>Date:</strong> {formatDate(order.date)}</p>
          <p><strong>Total Amount:</strong> {formatPrice(order.total)}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Delivery Address:</strong> {order.address}</p>
        </div>
        
        <div className="d-flex gap-3 justify-content-center">
          <Button as={Link} to="/dashboard" className="btn-organic">
            View Order Status
          </Button>
          <Button as={Link} to="/shop" variant="outline-organic">
            Continue Shopping
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default OrderConfirmation;