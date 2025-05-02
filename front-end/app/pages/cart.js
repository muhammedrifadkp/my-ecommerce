// frontend\pages\cart.js
'use client';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';
import { PayPalButton } from 'react-paypal-button-v2';
import { createOrder } from '../actions/orderActions';

const Cart = () => {    
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const [sdkReady, setSdkReady] = useState(false);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const successPaymentHandler = (paymentResult) => {
        dispatch(createOrder({
            orderItems: cartItems,
            paymentMethod: 'PayPal',
            itemsPrice: cart.itemsPrice,
            taxPrice: cart.taxPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
            paymentResult
        }));
    }

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            paymentMethod: 'PayPal',
            itemsPrice: cart.itemsPrice,
            taxPrice: cart.taxPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
        }));
    }

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    }

    cart.itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));   
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice)).toFixed(2);

    useEffect(() => {
        if(!window.paypal) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://www.paypalobjects.com/api/checkout.js';
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.appendChild(script);
        } else {
            setSdkReady(true);
        }
    }, []);

    return (
        <div className="cart">            
            <div className="cart__left">
                <h2>Shopping Cart</h2>
                {cartItems.length === 0 ? <div>Your cart is empty</div> : (
                    <div>
                        {cartItems.map(item => (
                            <div key={item.product}>
                                <div className="cart__item">
                                    <div className="cart__item__image">
                                        <img src={item.image} alt={item.name} />
                                    </div>  
</div>
</div>
))}
</div>
)}
</div>
<div className="cart__right">
<h2>Order Summary</h2>
<div className="cart__item">
    <div className="cart__item__name">Items</div>
    <div className="cart__item__price">${cart.itemsPrice}</div>
</div>
<div className="cart__item">
    <div className="cart__item__name">Tax</div>
    <div className="cart__item__price">${cart.taxPrice}</div>
</div>
<div className="cart__item">
    <div className="cart__item__name">Shipping</div>
    <div className="cart__item__price">${cart.shippingPrice}</div>
</div>
<div className="cart__item">
    <div className="cart__item__name">Total</div>
    <div className="cart__item__price">${cart.totalPrice}</div>
</div>
{cartItems.length !== 0 && (
    <div>
        <PayPalButton
            amount={cart.totalPrice}
            onSuccess={successPaymentHandler}
        />
    </div>
)}
</div>
</div>
);
}

