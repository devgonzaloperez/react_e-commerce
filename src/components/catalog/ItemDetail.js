import React, {useContext, useState} from 'react';
import { ItemCount } from './ItemCount';
import {Link} from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './ItemDetail.scss';
import Lottie from 'lottie-react';
import cart from '../../assets/lottie/cart.json';
import manWithPhone from '../../assets/lottie/manWithPhone.json';

export const ItemDetail = ({item}) => {

    const [showButton, setShowButton] = useState(false);

    const {addToCart} = useContext(CartContext);

    const onAddItem = (countFromChild) =>{
        addToCart(item, countFromChild);
        setShowButton(true);
    }

    const lottieCartOptions = {
        animationData: cart,
        autoplay: true,
        loop: true,
        style:{
            width: "60%"
        }
    }

    const lottieManWithPhoneOptions = {
        animationData: manWithPhone,
        autoplay: true,
        loop: true,
        style:{
            width: "60%"
        }
    }

    return(

        <>
            <div className="itemDetail">
                
                <div className="itemDetail__image animate__animated animate__fadeInLeft">
                    <img src={item.imageURL} alt={item.title}/>
                </div>
                <div className="itemDetail__details animate__animated animate__fadeIn">
                    <h2>{item.title}</h2>
                    <h3>{item.details}.</h3>
                    <span>{item.price} €</span>
                    <p>Lo podés pagar en 3 cuotas sin interés de {(item.price/3).toFixed(2)} €.</p>
                    <h4>Detalles:</h4>
                    <ul>
                        <li>Sistema Operativo: {item.operativeSystem}.</li>
                        <li>Cámara: {item.camera}.</li>
                        <li>Memoria: {item.memory}.</li>
                        <li>SIM: {item.sim}.</li>
                        <li>Pantalla: {item.screen}.</li>
                        <li>Procesador: {item.processor}.</li>
                    </ul>
                </div>
                
                {
                    !showButton
                        ? 
                        <div className="itemDetail__itemCount animate__animated animate__fadeIn">
                            <ItemCount initial={0} productName={item.title} stock={item.stock} onAddItem={onAddItem}/>
                        </div>
                        :
                        <div className="itemDetail__goToCatalogOrCart animate__animated animate__fadeIn">
                            <div className="itemDetail__goToCatalogOrCart-toCatalog">
                                <Lottie {...lottieManWithPhoneOptions}/>
                                <Link to="/catalog">¡Seguir comprando!</Link>
                            </div>
                            <div className="itemDetail__goToCatalogOrCart-toCart">
                                <Lottie {...lottieCartOptions}/>
                                <Link to="/cart">¡Finalizar compra!</Link>
                            </div>
                        </div>
                }

            </div>
        </>

    )
};
