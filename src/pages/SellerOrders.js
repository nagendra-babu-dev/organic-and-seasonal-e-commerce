import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Button, Badge, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { orderService } from '../services/orderService';
import { formatDate, formatPrice } from '../utils/formatters';

const ORDER_STATUS_OPTIONS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const SellerOrders = () => {
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

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      setBusyKey(`status-${orderId}`);
      await orderService.updateOrderStatus(orderId, status);
      setOrders((current) => current.map((order) => (order.id === orderId ? { ...order, status } : order)));
      if (selectedOrder?.id === orderId) {
        setSelectedOrder((current) => (current ? { ...current, status } : current));
      }
      toast.success('Order status updated');
    } catch (error) {
      toast.error(error.message || 'Failed to update order status');
    } finally {
      setBusyKey('');
    }
  };

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-4">
          <h4 className="fw-bold mb-4">Seller Orders</h4>

          <div className="table-responsive">
            <Table className="align-middle">
              <thead>
                <tr className="border-bottom">
                  <th>Order ID</th>
                  <th>Customer</th>
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
                    <td>{order.customer_name || '-'}</td>
                    <td>{formatDate(order.created_at)}</td>
                    <td>{order.item_count || 0}</td>
                    <td>{formatPrice(order.farmer_total || order.final_amount)}</td>
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

                      <Form.Select
                        size="sm"
                        value={order.status}
                        onChange={(event) => handleUpdateOrderStatus(order.id, event.target.value)}
                        disabled={busyKey === `status-${order.id}`}
                        style={{ minWidth: '150px' }}
                      >
                        {ORDER_STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </Form.Select>
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
                  <span className="fw-bold text-success">{formatPrice(selectedOrder.farmer_total || selectedOrder.final_amount)}</span>
                </div>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SellerOrders;
