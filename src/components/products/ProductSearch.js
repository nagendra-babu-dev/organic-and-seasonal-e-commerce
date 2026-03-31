import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const ProductSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <InputGroup>
      <InputGroup.Text className="bg-white">
        <FaSearch className="text-muted" />
      </InputGroup.Text>
      <FormControl
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border-start-0"
      />
    </InputGroup>
  );
};

export default ProductSearch;