import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';
import Loader from './common/Loader';
import EmptyState from './common/EmptyState';
import { formatPrice } from '../utils/formatters';
import { productService } from '../services/productService';

const FeaturedProducts = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const products = await productService.getFeaturedProducts();
        setFeatured(products.slice(0, 4));
      } catch (error) {
        console.error('Failed to load featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  if (loading) {
    return <Loader text="Loading featured products..." minHeight="30vh" />;
  }

  if (featured.length === 0) {
    return (
      <EmptyState
        icon={<FaLeaf size={64} className="text-muted" />}
        title="No featured products yet"
        description="Fresh seasonal picks will appear here once products are available."
        actionLabel="Browse Shop"
        actionTo="/shop"
      />
    );
  }

  return (
    <section className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">Featured Products</h2>
          <p className="lead text-muted">Our most loved organic products this season</p>
        </div>

        <Row className="g-4">
          {featured.map((product) => (
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
