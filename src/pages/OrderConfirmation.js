import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import EmptyState from '../components/common/EmptyState';
import { formatPrice, formatDate } from '../utils/formatters';

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <EmptyState
        title="No order to show"
        description="Place an order first or check your dashboard for recent purchases."
        actionLabel="Go to Dashboard"
        actionTo="/dashboard"
      />
    );
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
          <p><strong>Order ID:</strong> #{order.order_number || order.id}</p>
          <p><strong>Date:</strong> {formatDate(order.created_at || new Date())}</p>
          <p><strong>Total Amount:</strong> {formatPrice(order.final_amount || order.total_amount || 0)}</p>
          <p><strong>Payment Method:</strong> {order.payment_method || order.paymentMethod}</p>
          <p><strong>Delivery Address:</strong> {order.shipping_address || order.address}</p>
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
