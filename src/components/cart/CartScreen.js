import { addDoc, collection, getDocs, query, where, documentId, writeBatch } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { db } from '../../firebase';
import Lottie from 'lottie-react';
import emptyBox from '../../assets/lottie/emptyBox.json';
import './CartScreen.scss';
import validator from 'validator';
import Swal from 'sweetalert2';

export const CartScreen = () => {

    const {cartItems, setCartItems, deleteOneFromCart, deleteAllFromCart, getCartQuantity, getCartTotalPrice} = useContext(CartContext);

    const [formValues, setFormValues] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });
    const [order, setOrder] = useState();

    useEffect(()=>{
        setOrder({
            date: new Date().toDateString(),
            buyer: formValues,
            items: cartItems,
            total: getCartTotalPrice()
        })
    }, [formValues, cartItems, getCartTotalPrice])

    const handleInputChange = (event) =>{
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        })
    }

    const confirmOrder = async (e) =>{

        e.preventDefault()
        try{

            const formValidations = formValues.name.length > 0 && formValues.phone.length >= 8 && formValues.email.length > 10 && validator.isEmail(formValues.email) && formValues.address.length > 5; 

            if(formValidations){
                const orderCollection = await collection(db, "orders");
                const orderAdded = await addDoc(orderCollection, order);
                
                const cartItemsIDS = order.items.map(item => item.id);
                const itemsToUpdateQuery = await query(collection(db, "itemsOK"), where(documentId(), "in", cartItemsIDS));
                const itemsToUpdateQuerySnapshot = await getDocs(itemsToUpdateQuery);
                const batch = writeBatch(db);

                itemsToUpdateQuerySnapshot.docs.forEach((itemSnapshot, index) =>{
                    batch.update(itemSnapshot.ref, {stock: itemSnapshot.data().stock - order.items[index].quantity})
                })

                await batch.commit();

                Swal.fire({
                    icon: 'success',
                    title: '¡Compra confirmada!',
                    text: `Su compra ha sido realizada con éxito y el ID de la misma es ${orderAdded.id}. En breves recibirá un E-Mail con todos los detalles y en las próximas 24H/48H recibirá el producto en la dirección indicada.`
                })

                setCartItems([]);
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: '¡Ups!',
                    text: 'Se produjo un error al completar el formulario. Por favor vuelva a completarlo.',
                })
            } 
        }
        catch(error){
            console.log(error)
        }
    }

    const lottieEmptyBoxOptions = {
        animationData: emptyBox,
        autoplay: true,
        loop: true,
        style:{
            width: "50%"
        }
    }

    return (
        <main className="cartScreen__main">
            {
                (cartItems.length === 0)
                ? 
                <div className="cartScreen__main-noProducts">
                    <Lottie {...lottieEmptyBoxOptions}/>
                    <p>No hay productos en su carrito.</p>
                    <Link to="/catalog">¡Volver al catálogo!</Link>
                </div> 
                : 
                <div className="cartScreen__main-cartList animate__animated animate__fadeIn">
                    <div className="cartListAndCartData">
                        <h1>Productos ({getCartQuantity()}).</h1>
                        <div className="cartList">
                            <ul>
                                {cartItems.map(cartItem =>(
                                    <li key={cartItem.id}>
                                        <img src={cartItem.imageURL} alt={cartItem.title}></img>
                                        <p>{cartItem.title} (x{cartItem.quantity})</p>
                                        <span>{cartItem.price*cartItem.quantity} €</span>
                                        <button onClick={()=> deleteOneFromCart(cartItem.id)}>Eliminar Producto</button>
                                        <hr/>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="cartPrice">
                            <p>Total:</p>
                            <span>{getCartTotalPrice()} €</span>
                        </div>
                        <div className="deleteAllButton">
                            <button onClick={deleteAllFromCart}>Vaciar Carrito</button>
                        </div>
                    </div>
                    <div className="confirmOrderForm">
                        <form onSubmit={confirmOrder}>
                            <h3>¡Finalizá tu compra!</h3>
                            <div>
                                <label>Nombre Completo:</label>
                                <input type="text" name="name" onChange={handleInputChange} autocomplete="off"/>
                            </div>
                            <div>
                                <label>Teléfono:</label>
                                <input type="text" name="phone" onChange={handleInputChange} autocomplete="off"/>
                            </div>
                            <div>
                                <label>Email:</label>
                                <input type="email" name="email" onChange={handleInputChange} autocomplete="off"/>
                            </div>
                            <div>
                                <label>Dirección:</label>
                                <input type="address" name="address" onChange={handleInputChange} autocomplete="off"/>
                            </div>
                            <button type="submit">Confirmar Compra</button>
                        </form>
                    </div>
                </div>
            }
        </main>
    )
};