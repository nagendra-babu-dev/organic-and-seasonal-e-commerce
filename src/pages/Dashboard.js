import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Table } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { dashboardService } from '../services/dashboardService';
import { formatDate, formatPrice } from '../utils/formatters';

const Dashboard = () => {
  const { user } = useAuth();
  const isFarmer = user?.userType === 'farmer';
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = isFarmer
          ? await dashboardService.getFarmerStats()
          : await dashboardService.getCustomerStats();
        setStatsData(data);
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      }
    };

    if (user) {
      loadStats();
    }
  }, [user, isFarmer]);

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
      <Card className="border-0 shadow-sm rounded-4 mb-4">
        <Card.Body className="d-flex flex-wrap align-items-center justify-content-between gap-3 p-4">
          <div>
            <h4 className="fw-bold mb-1">Dashboard</h4>
            <p className="text-muted mb-0">{user.name} ({user.email})</p>
          </div>
          <Badge bg={isFarmer ? 'success' : 'info'} className="px-3 py-2">
            {isFarmer ? 'Farmer' : 'Customer'}
          </Badge>
        </Card.Body>
      </Card>

      {isFarmer && statsData?.stats && (
        <>
          <Row className="g-3 mb-4">
            <Col md={3}>
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body>
                  <p className="text-muted mb-1">Products</p>
                  <h4 className="fw-bold mb-0">{statsData.stats.totalProducts}</h4>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body>
                  <p className="text-muted mb-1">Stock</p>
                  <h4 className="fw-bold mb-0">{statsData.stats.totalStock}</h4>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body>
                  <p className="text-muted mb-1">Orders</p>
                  <h4 className="fw-bold mb-0">{statsData.stats.totalOrders}</h4>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body>
                  <p className="text-muted mb-1">Revenue</p>
                  <h4 className="fw-bold mb-0">{formatPrice(statsData.stats.totalRevenue || 0)}</h4>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="g-4">
            <Col lg={7}>
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body>
                  <h5 className="fw-bold mb-3">Recent Orders</h5>
                  <div className="table-responsive">
                    <Table className="align-middle mb-0">
                      <thead>
                        <tr>
                          <th>Order</th>
                          <th>Customer</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(statsData.recentOrders || []).slice(0, 8).map((order, index) => (
                          <tr key={`${order.order_number}-${index}`}>
                            <td>#{order.order_number}</td>
                            <td>{order.customer_name}</td>
                            <td>{formatDate(order.created_at)}</td>
                            <td>{order.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={5}>
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body>
                  <h5 className="fw-bold mb-3">Low Stock Products</h5>
                  <div className="table-responsive">
                    <Table className="align-middle mb-0">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(statsData.lowStockProducts || []).slice(0, 8).map((product, index) => (
                          <tr key={`${product.name}-${index}`}>
                            <td>{product.name}</td>
                            <td>{product.stock}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}

      {!isFarmer && statsData?.stats && (
        <>
          <Row className="g-3 mb-4">
            <Col md={3}>
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body>
                  <p className="text-muted mb-1">Orders</p>
                  <h4 className="fw-bold mb-0">{statsData.stats.totalOrders}</h4>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body>
                  <p className="text-muted mb-1">Spent</p>
                  <h4 className="fw-bold mb-0">{formatPrice(statsData.stats.totalSpent || 0)}</h4>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body>
                  <p className="text-muted mb-1">Delivered</p>
                  <h4 className="fw-bold mb-0">{statsData.stats.completedOrders}</h4>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="border-0 shadow-sm rounded-4">
                <Card.Body>
                  <p className="text-muted mb-1">Wishlist</p>
                  <h4 className="fw-bold mb-0">{statsData.stats.wishlistItems}</h4>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="border-0 shadow-sm rounded-4">
            <Card.Body>
              <h5 className="fw-bold mb-3">Recent Orders</h5>
              <div className="table-responsive">
                <Table className="align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(statsData.recentOrders || []).map((order) => (
                      <tr key={order.order_number}>
                        <td>#{order.order_number}</td>
                        <td>{formatDate(order.created_at)}</td>
                        <td>{order.status}</td>
                        <td>{formatPrice(order.final_amount || 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
