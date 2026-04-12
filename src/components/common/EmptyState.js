import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  actionTo = '/',
  actionVariant = 'organic'
}) => {
  return (
    <Container className="py-5 text-center">
      <div className="py-5">
        {icon && <div className="mb-4">{icon}</div>}
        <h2 className="mb-3">{title}</h2>
        <p className="text-muted mb-4">{description}</p>
        {actionLabel && (
          <Button as={Link} to={actionTo} className={actionVariant === 'organic' ? 'btn-organic btn-lg' : undefined} variant={actionVariant === 'organic' ? undefined : actionVariant}>
            {actionLabel}
          </Button>
        )}
      </div>
    </Container>
  );
};

export default EmptyState;
