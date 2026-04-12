import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ text = 'Loading...', minHeight = '60vh' }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-3" style={{ minHeight }}>
      <Spinner animation="border" variant="success" role="status">
        <span className="visually-hidden">{text}</span>
      </Spinner>
      <p className="text-muted mb-0">{text}</p>
    </div>
  );
};

export default Loader;
