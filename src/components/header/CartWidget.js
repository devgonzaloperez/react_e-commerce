import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './CartWidget.scss';

export const CartWidget = () => {
    
    const {cartItems, getCartQuantity} = useContext(CartContext);
    
    return (

            <div className="cartWidget">
                { cartItems.length > 0 &&

                    <Link to='/cart'>
                        <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-shopping-cart-black-friday-flaticons-lineal-color-flat-icons.png" alt="Cart"/>
                        <span className="cart-quantity">{getCartQuantity()}</span>
                    </Link>
                
                }
            </div>

    )
};
