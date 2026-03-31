import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaHeart, FaLeaf, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { formatPrice } from '../utils/formatters';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = localStorage.getItem('user');
    
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);
  
  // Mock orders data
  const orders = [
    { id: 'ORD-001', date: '2024-01-15', total: 18.6, status: 'Delivered', items: 3 },
    { id: 'ORD-002', date: '2024-01-22', total: 27.4, status: 'Shipped', items: 5 },
    { id: 'ORD-003', date: '2024-01-28', total: 12.8, status: 'Processing', items: 2 },
  ];
  
  // Mock wishlist data
  const wishlist = [
    { id: 1, name: 'Organic Heirloom Tomatoes', price: 2.4, image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { id: 3, name: 'Organic Alphonso Mangoes', price: 4.8, image: 'https://images.unsplash.com/photo-1744087180144-bab664b51900?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWxwaG9uc28lMjBtYW5nb3xlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=1200' },
  ];
  
  // Mock farmer products (if user is farmer)
  const farmerProducts = [
    { id: 1, name: 'Organic Spinach', price: 1.6, stock: 50, status: 'Active' },
    { id: 2, name: 'Organic Carrots', price: 1.3, stock: 30, status: 'Active' },
  ];
  
  const getStatusBadge = (status) => {
    const variants = {
      'Delivered': 'success',
      'Shipped': 'info',
      'Processing': 'warning',
      'Cancelled': 'danger'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
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
                {user.userType === 'farmer' ? '🌾 Farmer' : '👤 Customer'}
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
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order.id}>
                            <td className="fw-bold">#{order.id}</td>
                            <td>{order.date}</td>
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
                      {wishlist.map(item => (
                        <Col md={6} key={item.id} className="mb-3">
                          <Card className="border-0 shadow-sm">
                            <Card.Body className="d-flex align-items-center gap-3">
                              <img src={item.image} alt={item.name} width="60" height="60" style={{ borderRadius: '12px', objectFit: 'cover' }} />
                              <div className="flex-grow-1">
                                <h6 className="mb-1 fw-bold">{item.name}</h6>
                                <p className="text-success fw-bold mb-0">{formatPrice(item.price)}</p>
                              </div>
                              <Button variant="outline-danger" size="sm">
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
                    <Button className="btn-organic">
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
                        {farmerProducts.map(product => (
                          <tr key={product.id}>
                            <td className="fw-bold">{product.name}</td>
                            <td>{formatPrice(product.price)}</td>
                            <td>{product.stock} units</td>
                            <td><Badge bg="success">{product.status}</Badge></td>
                            <td>
                              <Button variant="outline-primary" size="sm" className="me-2">
                                <FaEdit />
                              </Button>
                              <Button variant="outline-danger" size="sm">
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
