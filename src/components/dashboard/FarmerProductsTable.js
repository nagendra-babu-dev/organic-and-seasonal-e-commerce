import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { formatPrice } from '../../utils/formatters';

const FarmerProductsTable = ({ products, onAdd, onEdit, onDelete }) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">My Products</h4>
        <Button className="btn-organic" onClick={onAdd}>
          <FaPlus className="me-2" /> Add New Product
        </Button>
      </div>
      
      <div className="table-responsive">
        <Table className="align-middle">
          <thead>
            <tr className="border-bottom">
              <th>Product Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td className="fw-bold">{product.name}</td>
                <td>{formatPrice(product.price)}</td>
                <td>{product.stock} units</td>
                <td>
                  <Badge bg={product.stock > 0 ? 'success' : 'danger'}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => onEdit(product)}>
                    <FaEdit />
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => onDelete(product.id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default FarmerProductsTable;