import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaLeaf, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatPrice } from '../../utils/formatters';

const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <Card className="product-card h-100" onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
      <div className="product-card__media">
        <Card.Img 
          variant="top" 
          src={product.image} 
          className="product-card__image hover-zoom"
        />
        <div className="product-card__badges">
          {product.seasonal && (
            <div className="seasonal-badge">
              🌿 {product.season} Seasonal
            </div>
          )}
          {product.organic && (
            <div className="organic-badge">
              <FaLeaf /> 100% Organic
            </div>
          )}
        </div>
      </div>
      
      <Card.Body className="product-card__body">
        <div className="product-card__header">
          <Card.Title className="product-card__title mb-0 fw-bold">
            {product.name}
          </Card.Title>
          <div className="product-card__rating text-warning">
            <FaStar className="me-1" /> {product.rating}
          </div>
        </div>
        
        <Card.Text className="product-card__location text-muted small mb-2">
          {product.farm} • {product.origin}
        </Card.Text>
        
        <div className="product-card__tags mb-3">
          {product.organicCertified && (
            <span className="badge bg-success me-2">Certified Organic</span>
          )}
          {product.seasonal && (
            <span className="badge bg-warning text-dark">In Season</span>
          )}
        </div>
        
        <Card.Text className="product-card__description">
          {product.description.substring(0, 80)}...
        </Card.Text>
        
        <div className="product-card__footer">
          <div className="product-card__price">
            <span className="h5 fw-bold text-success">{formatPrice(product.price)}</span>
            <span className="text-muted small"> / {product.unit}</span>
          </div>
          <Button 
            variant="organic" 
            className="btn-organic product-card__cta"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
