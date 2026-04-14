import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { orderService } from '../services/orderService';
import { productService } from '../services/productService';
import { formatDate } from '../utils/formatters';

const CustomerReviews = () => {
  const [reviewItems, setReviewItems] = useState([]);
  const [busyKey, setBusyKey] = useState('');
  const [forms, setForms] = useState({});

  useEffect(() => {
    const loadReviewableProducts = async () => {
      try {
        const orders = await orderService.getOrders();
        const deliveredOrders = orders.filter((order) => (order.status || '').toLowerCase() === 'delivered');
        const details = await Promise.all(deliveredOrders.map((order) => orderService.getOrderById(order.id)));

        const uniqueItems = new Map();
        details.forEach((order) => {
          (order.items || []).forEach((item) => {
            if (!uniqueItems.has(item.product_id)) {
              uniqueItems.set(item.product_id, {
                productId: item.product_id,
                name: item.product_name,
                image: item.image,
                orderedOn: order.created_at
              });
            }
          });
        });

        const items = Array.from(uniqueItems.values());
        setReviewItems(items);
        setForms(
          items.reduce((accumulator, item) => {
            accumulator[item.productId] = { rating: '5', comment: '' };
            return accumulator;
          }, {})
        );
      } catch (error) {
        toast.error(error.message || 'Failed to load reviewable products');
      }
    };

    loadReviewableProducts();
  }, []);

  const handleSubmit = async (productId) => {
    const form = forms[productId];
    if (!form?.rating) {
      toast.error('Please choose a rating');
      return;
    }

    try {
      setBusyKey(`review-${productId}`);
      await productService.addReview(productId, {
        rating: Number(form.rating),
        comment: form.comment
      });
      toast.success('Review submitted successfully');
      setForms((current) => ({
        ...current,
        [productId]: { ...current[productId], comment: '' }
      }));
    } catch (error) {
      toast.error(error.message || 'Failed to submit review');
    } finally {
      setBusyKey('');
    }
  };

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-4">
          <h4 className="fw-bold mb-4">My Reviews</h4>

          {reviewItems.length === 0 ? (
            <p className="text-muted mb-0">Delivered products will appear here for review.</p>
          ) : (
            <Row>
              {reviewItems.map((item) => (
                <Col lg={6} key={item.productId} className="mb-4">
                  <Card className="border-0 bg-light h-100">
                    <Card.Body>
                      <div className="d-flex gap-3 mb-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          width="80"
                          height="80"
                          style={{ borderRadius: '12px', objectFit: 'cover' }}
                        />
                        <div>
                          <h6 className="fw-bold mb-1">{item.name}</h6>
                          <p className="text-muted small mb-2">Delivered on {formatDate(item.orderedOn)}</p>
                          <Link to={`/product/${item.productId}`} className="text-success text-decoration-none">
                            View Product
                          </Link>
                        </div>
                      </div>

                      <Form.Group className="mb-3">
                        <Form.Label>Rating</Form.Label>
                        <Form.Select
                          value={forms[item.productId]?.rating || '5'}
                          onChange={(event) =>
                            setForms((current) => ({
                              ...current,
                              [item.productId]: {
                                ...current[item.productId],
                                rating: event.target.value
                              }
                            }))
                          }
                        >
                          <option value="5">5 - Excellent</option>
                          <option value="4">4 - Very Good</option>
                          <option value="3">3 - Good</option>
                          <option value="2">2 - Fair</option>
                          <option value="1">1 - Poor</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={forms[item.productId]?.comment || ''}
                          onChange={(event) =>
                            setForms((current) => ({
                              ...current,
                              [item.productId]: {
                                ...current[item.productId],
                                comment: event.target.value
                              }
                            }))
                          }
                        />
                      </Form.Group>

                      <Button
                        className="btn-organic"
                        onClick={() => handleSubmit(item.productId)}
                        disabled={busyKey === `review-${item.productId}`}
                      >
                        {busyKey === `review-${item.productId}` ? 'Submitting...' : 'Submit Review'}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CustomerReviews;
