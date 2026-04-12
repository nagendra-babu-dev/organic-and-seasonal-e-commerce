import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaHeart, FaLeaf, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { formatDate, formatPrice } from '../utils/formatters';
import { useAuth } from '../hooks/useAuth';
import { orderService } from '../services/orderService';
import { userService } from '../services/userService';
import { productService } from '../services/productService';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [farmerProducts, setFarmerProducts] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [busyKey, setBusyKey] = useState('');

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [ordersData, wishlistData] = await Promise.all([
          orderService.getOrders(),
          userService.getWishlist()
        ]);

        setOrders(ordersData);
        setWishlist(wishlistData);

        if (user?.userType === 'farmer') {
          const farmerProductsData = await productService.getMyProducts();
          setFarmerProducts(farmerProductsData);
        }
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      }
    };

    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const getStatusBadge = (status) => {
    const variants = {
      delivered: 'success',
      shipped: 'info',
      processing: 'warning',
      pending: 'secondary',
      cancelled: 'danger'
    };
    const normalizedStatus = (status || '').toLowerCase();
    return <Badge bg={variants[normalizedStatus] || 'secondary'}>{status}</Badge>;
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
        setSelectedOrder((current) => current ? { ...current, status: 'cancelled' } : current);
      }
      toast.success('Order cancelled successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to cancel order');
    } finally {
      setBusyKey('');
    }
  };

  const handleToggleProductStatus = async (product) => {
    try {
      setBusyKey(`product-${product.id}`);
      const response = await productService.updateProduct(product.id, {
        is_active: product.is_active ? 0 : 1
      });
      setFarmerProducts((current) =>
        current.map((item) => (item.id === product.id ? response.product : item))
      );
      toast.success(`Product marked as ${product.is_active ? 'inactive' : 'active'}`);
    } catch (error) {
      toast.error(error.message || 'Failed to update product');
    } finally {
      setBusyKey('');
    }
  };

  if (!user) {
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
      <Row>
        <Col lg={3}>
          <Card className="border-0 shadow-sm rounded-4 mb-4">
            <Card.Body className="text-center p-4">
              <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                <FaUser size={48} className="text-success" />
              </div>
              <h5 className="fw-bold mb-1">{user.name}</h5>
              <p className="text-muted small mb-2">{user.email}</p>
              <Badge bg={user.userType === 'farmer' ? 'success' : 'info'} className="px-3 py-2">
                {user.userType === 'farmer' ? 'Farmer' : 'Customer'}
              </Badge>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm rounded-4">
            <Card.Body className="p-3">
              <div className="d-flex flex-column gap-2">
                <Button
                  variant={activeTab === 'orders' ? 'success' : 'light'}
                  className="text-start d-flex align-items-center gap-2"
                  onClick={() => setActiveTab('orders')}
                >
                  <FaShoppingBag /> My Orders
                </Button>
                <Button
                  variant={activeTab === 'wishlist' ? 'success' : 'light'}
                  className="text-start d-flex align-items-center gap-2"
                  onClick={() => setActiveTab('wishlist')}
                >
                  <FaHeart /> Wishlist
                </Button>
                {user.userType === 'farmer' && (
                  <Button
                    variant={activeTab === 'products' ? 'success' : 'light'}
                    className="text-start d-flex align-items-center gap-2"
                    onClick={() => setActiveTab('products')}
                  >
                    <FaLeaf /> My Products
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={9}>
          <Card className="border-0 shadow-sm rounded-4">
            <Card.Body className="p-4">
              {activeTab === 'orders' && (
                <>
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
                            <td>{order.item_count} items</td>
                            <td>{formatPrice(order.final_amount)}</td>
                            <td>{getStatusBadge(order.status)}</td>
                            <td className="d-flex gap-2">
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
                </>
              )}

              {activeTab === 'wishlist' && (
                <>
                  <h4 className="fw-bold mb-4">My Wishlist</h4>
                  {wishlist.length === 0 ? (
                    <div className="text-center py-5">
                      <FaHeart size={48} className="text-muted mb-3" />
                      <p>Your wishlist is empty</p>
                      <Button as={Link} to="/shop" className="btn-organic">
                        Start Shopping
                      </Button>
                    </div>
                  ) : (
                    <Row>
                      {wishlist.map((item) => (
                        <Col md={6} key={item.id} className="mb-3">
                          <Card className="border-0 shadow-sm">
                            <Card.Body className="d-flex align-items-center gap-3">
                              <img src={item.image} alt={item.name} width="60" height="60" style={{ borderRadius: '12px', objectFit: 'cover' }} />
                              <div className="flex-grow-1">
                                <h6 className="mb-1 fw-bold">{item.name}</h6>
                                <p className="text-success fw-bold mb-0">{formatPrice(item.price)}</p>
                              </div>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={async () => {
                                  try {
                                    await userService.removeFromWishlist(item.product_id || item.id);
                                    setWishlist((current) => current.filter((wishlistItem) => wishlistItem.id !== item.id));
                                  } catch (error) {
                                    toast.error(error.message || 'Failed to remove item');
                                  }
                                }}
                              >
                                Remove
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  )}
                </>
              )}

              {activeTab === 'products' && user.userType === 'farmer' && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold mb-0">My Products</h4>
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
                        {farmerProducts.map((product) => (
                          <tr key={product.id}>
                            <td className="fw-bold">{product.name}</td>
                            <td>{formatPrice(product.price)}</td>
                            <td>{product.stock} units</td>
                            <td><Badge bg={product.is_active ? 'success' : 'secondary'}>{product.is_active ? 'Active' : 'Inactive'}</Badge></td>
                            <td className="d-flex gap-2">
                              <Button
                                variant={product.is_active ? 'outline-secondary' : 'outline-success'}
                                size="sm"
                                onClick={() => handleToggleProductStatus(product)}
                                disabled={busyKey === `product-${product.id}`}
                              >
                                {product.is_active ? 'Deactivate' : 'Activate'}
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={async () => {
                                  try {
                                    await productService.deleteProduct(product.id);
                                    setFarmerProducts((current) => current.filter((item) => item.id !== product.id));
                                    toast.success('Product deleted successfully');
                                  } catch (error) {
                                    toast.error(error.message || 'Failed to delete product');
                                  }
                                }}
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
