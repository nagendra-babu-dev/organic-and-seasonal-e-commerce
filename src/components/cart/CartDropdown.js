import React from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
  const { cart, cartCount, cartTotal, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="link" className="text-dark text-decoration-none position-relative">
        <FaShoppingCart size={22} />
        {cartCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
            {cartCount}
          </span>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-3" style={{ width: '320px' }}>
        {cart.length === 0 ? (
          <div className="text-center py-3">
            <p className="text-muted mb-0">Your cart is empty</p>
          </div>
        ) : (
          <>
            {cart.slice(0, 5).map(item => (
              <div key={item.id} className="d-flex align-items-center gap-2 mb-3 pb-2 border-bottom">
                <img src={item.image} alt={item.name} width="50" height="50" style={{ borderRadius: '8px', objectFit: 'cover' }} />
                <div className="flex-grow-1">
                  <h6 className="mb-0 fw-bold">{item.name}</h6>
                  <small className="text-muted">Qty: {item.quantity}</small>
                  <div className="text-success fw-bold">{formatPrice(item.price * item.quantity)}</div>
                </div>
                <Button variant="link" className="text-danger p-0" onClick={() => removeFromCart(item.id)}>
                  <FaTrash size={14} />
                </Button>
              </div>
            ))}
            
            <div className="border-top pt-2 mt-2">
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-success">{formatPrice(cartTotal)}</strong>
              </div>
              <Button 
                className="btn-organic w-100"
                onClick={() => navigate('/checkout')}
              >
                Checkout
              </Button>
              {cart.length > 5 && (
                <Button 
                  variant="link" 
                  className="text-success w-100 mt-2"
                  onClick={() => navigate('/cart')}
                >
                  View all {cart.length} items
                </Button>
              )}
            </div>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CartDropdown;