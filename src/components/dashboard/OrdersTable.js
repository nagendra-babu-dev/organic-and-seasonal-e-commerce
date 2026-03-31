import React from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import { formatPrice, formatDate } from '../../utils/formatters';

const OrdersTable = ({ orders }) => {
  const getStatusBadge = (status) => {
    const variants = {
      'Delivered': 'success',
      'Shipped': 'info',
      'Processing': 'warning',
      'Pending': 'secondary',
      'Cancelled': 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <div className="table-responsive">
      <Table className="align-middle">
        <thead>
          <tr className="border-bottom">
            <th>Order ID</th>
            <th>Date</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="fw-bold">#{order.id}</td>
              <td>{formatDate(order.date)}</td>
              <td>{order.items} items</td>
              <td>{formatPrice(order.total)}</td>
              <td>{getStatusBadge(order.status)}</td>
              <td>
                <Button variant="outline-success" size="sm">
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrdersTable;