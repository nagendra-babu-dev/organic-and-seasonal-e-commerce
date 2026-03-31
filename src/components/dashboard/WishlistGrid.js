import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../hooks/useCart';
import { toast } from 'react-toastify';

const WishlistGrid = ({ items, onRemove }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <FaHeart size={48} className="text-muted mb-3" />
        <p className="text-muted">Your wishlist is empty</p>
      </div>
    );
  }

  return (
    <Row className="g-4">
      {items.map(item => (
        <Col key={item.id} md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center gap-3">
              <img 
                src={item.image} 
                alt={item.name} 
                width="80" 
                height="80" 
                style={{ borderRadius: '12px', objectFit: 'cover' }}
              />
              <div className="flex-grow-1">
                <h6 className="fw-bold mb-1">{item.name}</h6>
                <p className="text-success fw-bold mb-2">{formatPrice(item.price)}</p>
                <div className="d-flex gap-2">
                  <Button size="sm" className="btn-organic" onClick={() => handleAddToCart(item)}>
                    <FaShoppingCart className="me-1" /> Add to Cart
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={() => onRemove(item.id)}>
                    <FaHeart className="me-1" /> Remove
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default WishlistGrid;