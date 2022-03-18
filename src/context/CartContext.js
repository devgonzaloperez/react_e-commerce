import React, { useState } from 'react';
import { createContext } from 'react';
import Swal from 'sweetalert2';

export const CartContext = createContext([]);

export const CartContextProvider = ({children}) => {

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [items, setItems] = useState([]);

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item, quantity) =>{
        if(cartItems.find(cartItem => cartItem.title === item.title)){
            setCartItems(cartItems.filter(cartItem => cartItem.quantity += quantity))
        }
        else{
            setCartItems([...cartItems, {...item, quantity}]);
        }
    }

    const deleteOneFromCart = (id) =>{
        Swal.fire({
            icon: "error",
            title: '¿Seguro que desea eliminar el producto?',
            showDenyButton: true,
            confirmButtonText: 'Cancelar',
            denyButtonText: 'Eliminar',
        })
        .then((result) => {
            if (!result.isConfirmed) {
                setCartItems(cartItems.filter(cartItem => cartItem.id !== id))
            }
        })
    }

    const deleteAllFromCart = () =>{
        Swal.fire({
            icon: "error",
            title: '¿Seguro que desea vaciar el carrito?',
            showDenyButton: true,
            confirmButtonText: 'Cancelar',
            denyButtonText: 'Vaciar',
        })
        .then((result) => {
            if (!result.isConfirmed) {
                setCartItems([])
            }
        })
    }

    const getCartQuantity = () =>{
        let cartQuantity = 0;
        for(let i = 0; i < cartItems.length; i++){
            cartQuantity += cartItems[i].quantity
        };
        return cartQuantity;
    }

    const getCartTotalPrice = () =>{
        let totalPrice = 0;
        for(let i = 0; i < cartItems.length; i++){
            totalPrice += (cartItems[i].price * cartItems[i].quantity)
        }
        return totalPrice;
    }

    return (
        <CartContext.Provider value={{search, setSearch, loading, setLoading, items, setItems, cartItems, setCartItems, addToCart, deleteOneFromCart, deleteAllFromCart, getCartQuantity, getCartTotalPrice}}>
            {children}
        </CartContext.Provider>
    )
}
