import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { formatPrice } from '../../utils/formatters';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="d-flex align-items-center gap-3 py-3 border-bottom">
      <img 
        src={item.image} 
        alt={item.name} 
        width="80" 
        height="80" 
        style={{ borderRadius: '12px', objectFit: 'cover' }}
      />
      <div className="flex-grow-1">
        <h6 className="fw-bold mb-1">{item.name}</h6>
        <small className="text-muted d-block">{item.farm}</small>
        <div className="text-success fw-bold mt-1">{formatPrice(item.price)} / {item.unit}</div>
      </div>
      <Form.Control
        type="number"
        min="1"
        max={item.stock || 99}
        value={item.quantity}
        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
        style={{ width: '80px' }}
      />
      <div className="fw-bold text-success" style={{ minWidth: '80px', textAlign: 'right' }}>
        {formatPrice(item.price * item.quantity)}
      </div>
      <Button 
        variant="link" 
        className="text-danger p-0"
        onClick={() => removeFromCart(item.id)}
      >
        <FaTrash />
      </Button>
    </div>
  );
};

export default CartItem;