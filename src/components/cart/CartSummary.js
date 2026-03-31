import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { formatPrice, calculateDeliveryCharge } from '../../utils/formatters';
import { FREE_DELIVERY_THRESHOLD } from '../../utils/constants';

const CartSummary = ({ cartTotal, onCheckout }) => {
  const deliveryCharge = calculateDeliveryCharge(cartTotal);
  const finalTotal = cartTotal + deliveryCharge;
  const remainingForFree = FREE_DELIVERY_THRESHOLD - cartTotal;

  return (
    <Card className="border-0 shadow-sm rounded-4 sticky-top" style={{ top: '100px' }}>
      <Card.Body className="p-4">
        <h4 className="fw-bold mb-4">Order Summary</h4>
        
        <div className="d-flex justify-content-between mb-3">
          <span>Subtotal</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        
        <div className="d-flex justify-content-between mb-3">
          <span>Delivery Charge</span>
          <span>{deliveryCharge === 0 ? 'Free' : formatPrice(deliveryCharge)}</span>
        </div>
        
        {cartTotal < FREE_DELIVERY_THRESHOLD && cartTotal > 0 && (
          <div className="alert alert-success py-2 mb-3 small">
            Add {formatPrice(remainingForFree)} more for free delivery!
          </div>
        )}
        
        <hr />
        
        <div className="d-flex justify-content-between mb-4">
          <strong className="h5 mb-0">Total</strong>
          <strong className="h5 mb-0 text-success">{formatPrice(finalTotal)}</strong>
        </div>
        
        <Button 
          className="btn-organic w-100 py-3"
          onClick={onCheckout}
          disabled={cartTotal === 0}
        >
          Proceed to Checkout
        </Button>
        
        <div className="mt-3 text-center">
          <small className="text-muted">
            🔒 Secure payment • 🚚 Free returns • 💚 24/7 support
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CartSummary;