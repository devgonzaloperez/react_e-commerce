import React from 'react';
import { Link } from 'react-router-dom';
import './Item.scss';

export const Item = ({item}) => { //Se encarga de mostrar el card del producto.
    return(
        <>
            <div className="item">
                <div className="item__imageContainer">
                    <Link to={`/catalog/product/${item.id}`}>
                        <img src={item.imageURL} alt={item.title}/>
                    </Link>
                </div>
                <div className="item__detailsContainer">
                    <h2><Link to={`/catalog/product/${item.id}`}>{item.title}</Link></h2>
                    <p>{item.details}.</p>
                    <span className="item__detailsContainer-noprice">{item.price + (item.price)*0.1} €</span>
                    <span className="item__detailsContainer-price">{item.price} €</span>
                </div>
            </div>
        </>
    )
};
