import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Badge, Card } from 'react-bootstrap';
import { FaStar, FaTruck, FaLeaf, FaCalendarAlt, FaMapMarkerAlt, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { products } from '../data/products';
import { formatPrice } from '../utils/formatters';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/shop');
    }
  }, [id, navigate]);
  
  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.success(`${quantity} ${product.unit} of ${product.name} added to cart!`);
  };
  
  if (!product) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }
  
  return (
    <Container className="py-5">
      <Row className="g-5">
        <Col lg={6}>
          <div className="position-relative">
            <img 
              src={product.image} 
              alt={product.name} 
              className="img-fluid rounded-4 shadow-lg"
              style={{ width: '100%', objectFit: 'cover' }}
            />
            {product.seasonal && (
              <div className="seasonal-badge">
                🌿 {product.season} Seasonal
              </div>
            )}
            {product.organic && (
              <div className="organic-badge">
                <FaLeaf /> 100% Organic
              </div>
            )}
          </div>
        </Col>
        
        <Col lg={6}>
          <div className="mb-3">
            <div className="d-flex align-items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-warning' : 'text-muted'} />
              ))}
              <span className="text-muted">({product.rating})</span>
            </div>
            <h1 className="display-5 fw-bold mb-3">{product.name}</h1>
            <p className="lead text-muted">{product.description}</p>
          </div>
          
          <div className="mb-4">
            <div className="d-flex align-items-center gap-3 mb-2">
              <Badge bg="success" className="px-3 py-2">Certified Organic</Badge>
              {product.seasonal && (
                <Badge bg="warning" className="px-3 py-2 text-dark">In Season Now</Badge>
              )}
            </div>
            
            <div className="d-flex gap-3 text-muted mb-3">
              <span><FaMapMarkerAlt className="me-1" /> {product.farm}, {product.origin}</span>
              <span><FaCalendarAlt className="me-1" /> Fresh Harvest</span>
            </div>
          </div>
          
          <div className="mb-4">
            <span className="display-6 fw-bold text-success">{formatPrice(product.price)}</span>
            <span className="text-muted"> / {product.unit}</span>
          </div>
          
          <div className="mb-4">
            <div className="d-flex align-items-center gap-3">
              <Form.Control
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                style={{ width: '100px' }}
                className="text-center"
              />
              <Button className="btn-organic flex-grow-1 py-3" onClick={handleAddToCart}>
                <FaShoppingCart className="me-2" /> Add to Cart
              </Button>
              <Button variant="outline-danger" className="py-3 px-4">
                <FaHeart />
              </Button>
            </div>
            <small className="text-muted mt-2 d-block">{product.stock} units available</small>
          </div>
          
          <Card className="border-0 bg-light rounded-4 mb-3">
            <Card.Body>
              <h6 className="fw-bold mb-2">✨ Nutrition Information</h6>
              <p className="mb-0 small">{product.nutritionInfo}</p>
            </Card.Body>
          </Card>
          
          <Card className="border-0 bg-light rounded-4">
            <Card.Body>
              <h6 className="fw-bold mb-2">💚 Health Benefits</h6>
              <p className="mb-0 small">{product.benefits}</p>
            </Card.Body>
          </Card>
          
          <div className="mt-4 p-3 bg-success bg-opacity-10 rounded-4 d-flex align-items-center gap-3">
            <FaTruck size={32} className="text-success" />
            <div>
              <h6 className="fw-bold mb-0">Free Delivery</h6>
              <small>On orders above £40 • Freshness Guaranteed</small>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
