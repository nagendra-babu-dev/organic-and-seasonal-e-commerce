import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { userService } from '../services/userService';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatters';

const CustomerWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const data = await userService.getWishlist();
        setWishlist(data);
      } catch (error) {
        toast.error(error.message || 'Failed to load wishlist');
      }
    };

    loadWishlist();
  }, []);

  const handleRemove = async (productId, itemId) => {
    try {
      await userService.removeFromWishlist(productId);
      setWishlist((current) => current.filter((item) => item.id !== itemId));
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error(error.message || 'Failed to remove item');
    }
  };

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-4">
          <h4 className="fw-bold mb-4">My Wishlist</h4>

          {wishlist.length === 0 ? (
            <div className="text-center py-5">
              <FaHeart size={48} className="text-muted mb-3" />
              <p>Your wishlist is empty</p>
              <Button as={Link} to="/shop" className="btn-organic">
                Browse Products
              </Button>
            </div>
          ) : (
            <Row>
              {wishlist.map((item) => (
                <Col md={6} key={item.id} className="mb-3">
                  <Card className="border-0 shadow-sm">
                    <Card.Body className="d-flex align-items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        width="72"
                        height="72"
                        style={{ borderRadius: '12px', objectFit: 'cover' }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1 fw-bold">{item.name}</h6>
                        <p className="text-success fw-bold mb-0">{formatPrice(item.price)}</p>
                      </div>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => addToCart(item, 1)}
                        >
                          <FaShoppingCart />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemove(item.product_id || item.id, item.id)}
                        >
                          <FaHeart />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CustomerWishlist;
