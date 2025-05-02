// frontend\components\CartPopup.js
'use client';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';

const CartPopup = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  useEffect(() => {
    // You can add any logic here to handle the cart popup behavior
  }, [cart]);

  return (
    <div className="cart-popup">
      <button onClick={toggleCart}>Open Cart</button>
      {showCart && (
        <div className="cart-popup-content">
          <h2>Cart</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
                <button onClick={() => removeFromCartHandler(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <Link to="/checkout">Checkout</Link>
        </div>
      )}
</div>
);
};

export default CartPopup;
