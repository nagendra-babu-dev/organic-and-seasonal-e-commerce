import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Button, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { orderService } from '../services/orderService';
import { formatDate, formatPrice } from '../utils/formatters';

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [busyKey, setBusyKey] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await orderService.getOrders();
        setOrders(data);
      } catch (error) {
        toast.error(error.message || 'Failed to load orders');
      }
    };

    loadOrders();
  }, []);

  const getStatusBadge = (status) => {
    const variants = {
      delivered: 'success',
      shipped: 'info',
      processing: 'warning',
      pending: 'secondary',
      cancelled: 'danger'
    };

    return <Badge bg={variants[(status || '').toLowerCase()] || 'secondary'}>{status}</Badge>;
  };

  const handleViewOrder = async (orderId) => {
    if (selectedOrderId === orderId) {
      setSelectedOrderId(null);
      setSelectedOrder(null);
      return;
    }

    try {
      setBusyKey(`order-${orderId}`);
      const order = await orderService.getOrderById(orderId);
      setSelectedOrderId(orderId);
      setSelectedOrder(order);
    } catch (error) {
      toast.error(error.message || 'Failed to load order details');
    } finally {
      setBusyKey('');
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      setBusyKey(`cancel-${orderId}`);
      await orderService.cancelOrder(orderId);
      setOrders((current) =>
        current.map((order) =>
          order.id === orderId ? { ...order, status: 'cancelled' } : order
        )
      );
      if (selectedOrder?.id === orderId) {
        setSelectedOrder((current) => (current ? { ...current, status: 'cancelled' } : current));
      }
      toast.success('Order cancelled successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to cancel order');
    } finally {
      setBusyKey('');
    }
  };

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-4">
          <h4 className="fw-bold mb-4">My Orders</h4>
          <div className="table-responsive">
            <Table className="align-middle">
              <thead>
                <tr className="border-bottom">
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="fw-bold">#{order.order_number || order.id}</td>
                    <td>{formatDate(order.created_at)}</td>
                    <td>{order.item_count || 0} items</td>
                    <td>{formatPrice(order.final_amount)}</td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td className="d-flex gap-2 flex-wrap">
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => handleViewOrder(order.id)}
                        disabled={busyKey === `order-${order.id}`}
                      >
                        {selectedOrderId === order.id ? 'Hide' : 'View'}
                      </Button>
                      {['pending', 'processing'].includes((order.status || '').toLowerCase()) && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleCancelOrder(order.id)}
                          disabled={busyKey === `cancel-${order.id}`}
                        >
                          Cancel
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {selectedOrder && (
            <Card className="border-0 bg-light mt-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">Order Details</h5>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <p className="text-muted mb-2">
                  Order #{selectedOrder.order_number || selectedOrder.id} • {formatDate(selectedOrder.created_at)}
                </p>
                <div className="mb-3">
                  {(selectedOrder.items || []).map((item) => (
                    <div key={item.id} className="d-flex justify-content-between py-2 border-bottom">
                      <span>{item.product_name} x {item.quantity}</span>
                      <span>{formatPrice(item.total)}</span>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fw-semibold">Total</span>
                  <span className="fw-bold text-success">{formatPrice(selectedOrder.final_amount)}</span>
                </div>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CustomerOrders;
