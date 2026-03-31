import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import { products } from '../data/products';
import { formatPrice } from '../utils/formatters';

const FeaturedProducts = () => {
  const featured = products.slice(0, 4);
  
  return (
    <section className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">Featured Products</h2>
          <p className="lead text-muted">Our most loved organic products this season</p>
        </div>
        
        <Row className="g-4">
          {featured.map(product => (
            <Col key={product.id} md={6} lg={3}>
              <Card className="product-card h-100">
                <div style={{ height: '220px', overflow: 'hidden' }}>
                  <Card.Img 
                    variant="top" 
                    src={product.image} 
                    style={{ height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <Card.Body className="text-center">
                  <div className="mb-2">
                    <FaLeaf className="text-success" />
                  </div>
                  <Card.Title className="fw-bold">{product.name}</Card.Title>
                  <Card.Text className="text-muted small">
                    {product.description}
                  </Card.Text>
                  <div className="h5 text-success fw-bold mb-3">{formatPrice(product.price)}</div>
                  <Button as={Link} to={`/product/${product.id}`} variant="outline-organic" className="btn-outline-organic w-100">
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        <div className="text-center mt-5">
          <Button as={Link} to="/shop" className="btn-organic btn-lg">
            View All Products
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
