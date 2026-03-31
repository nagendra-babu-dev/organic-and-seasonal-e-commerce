import React from 'react';
import { Container, Row, Col, Table, Button, Form, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { formatPrice, calculateDeliveryCharge } from '../utils/formatters';

const Cart = ({ cart, updateQuantity, removeFromCart, cartTotal }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  const deliveryCharge = calculateDeliveryCharge(cartTotal);
  const finalTotal = cartTotal + deliveryCharge;

  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        <div className="py-5">
          <FaShoppingCart size={80} className="text-muted mb-4" />
          <h2 className="mb-3">Your Cart is Empty</h2>
          <p className="text-muted mb-4">Looks like you haven't added any items to your cart yet.</p>
          <Button as={Link} to="/shop" className="btn-organic btn-lg">
            Continue Shopping
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="display-5 fw-bold mb-4">Shopping Cart</h1>
      <p className="text-muted mb-4">You have {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
      
      <Row>
        <Col lg={8}>
          <div className="bg-white rounded-4 shadow-sm p-4">
            <Table responsive className="align-middle">
              <thead>
                <tr className="border-bottom">
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id} className="border-bottom">
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '12px' }}
                        />
                        <div>
                          <h6 className="mb-1 fw-bold">{item.name}</h6>
                          <small className="text-success">{item.farm}</small>
                        </div>
                      </div>
                    </td>
                    <td>{formatPrice(item.price)}</td>
                    <td>
                      <Form.Control
                        type="number"
                        min="1"
                        max={item.stock || 99}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        style={{ width: '80px' }}
                      />
                    </td>
                    <td className="fw-bold">{formatPrice(item.price * item.quantity)}</td>
                    <td>
                      <Button 
                        variant="link" 
                        className="text-danger p-0"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            
            <div className="mt-4">
              <Button as={Link} to="/shop" variant="outline-organic" className="btn-outline-organic">
                <FaArrowLeft className="me-2" /> Continue Shopping
              </Button>
            </div>
          </div>
        </Col>
        
        <Col lg={4}>
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
              
              {cartTotal < 40 && (
                <div className="alert alert-success py-2 mb-3">
                  Add {formatPrice(40 - cartTotal)} more for free delivery!
                </div>
              )}
              
              <hr />
              
              <div className="d-flex justify-content-between mb-4">
                <strong className="h5 mb-0">Total</strong>
                <strong className="h5 mb-0 text-success">{formatPrice(finalTotal)}</strong>
              </div>
              
              <Button 
                className="btn-organic w-100 py-3"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              
              <div className="mt-3 text-center">
                <small className="text-muted">
                  Secure payment • Free returns • 24/7 support
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
