import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, addToCart }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <h4 className="text-muted">No products found</h4>
        <p className="text-muted">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <Row className="g-4">
      {products.map(product => (
        <Col key={product.id} md={6} lg={4}>
          <ProductCard product={product} addToCart={addToCart} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductGrid;