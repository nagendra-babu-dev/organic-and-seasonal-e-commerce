import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';

const NotFound = () => {
  return (
    <Container className="py-5 text-center">
      <div className="py-5">
        <FaLeaf size={80} className="text-muted mb-4" />
        <h1 className="display-1 fw-bold text-muted">404</h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="lead text-muted mb-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button as={Link} to="/" className="btn-organic btn-lg">
          Go Back Home
        </Button>
      </div>
    </Container>
  );
};

export default NotFound;