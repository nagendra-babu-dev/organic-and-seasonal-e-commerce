import React from 'react';
import { Form } from 'react-bootstrap';

const ProductSort = ({ sortBy, onSortChange }) => {
  return (
    <Form.Select 
      value={sortBy} 
      onChange={(e) => onSortChange(e.target.value)}
      style={{ width: '200px' }}
    >
      <option value="featured">Featured</option>
      <option value="newest">Newest First</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
      <option value="rating">Top Rated</option>
    </Form.Select>
  );
};

export default ProductSort;