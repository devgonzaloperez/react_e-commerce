import React, { useState } from 'react';
import './ItemCount.scss';

export const ItemCount = ({initial, productName, stock, onAddItem}) => {

    const [count, setCount] = useState(initial);

    const handleSubstract = () =>{
        count > 0 && setCount(count - 1) 
    }

    const handleAdd = () =>{
        count < stock && setCount(count + 1) 
    }

    const sendCountToParent = () =>{
        count > 0 && onAddItem(count);
    }

    return (
        <div className="itemCount">
            <div className="itemCount__counter">
                <button onClick={handleSubstract}>-</button>
                <p>{count}</p>
                <button onClick={handleAdd}>+</button>
            </div>
            <p>Stock Disponible: {stock}</p>
            <button className="addButton" onClick={sendCountToParent}>Agregar al Carrito</button>
        </div>
    )
};
